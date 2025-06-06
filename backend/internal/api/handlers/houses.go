package handlers

import (
	"context"
	"errors"
	"github.com/calyrexx/QuietGrooveBackend/internal/api"
	"github.com/calyrexx/QuietGrooveBackend/internal/entities"
	"github.com/calyrexx/QuietGrooveBackend/internal/pkg/errorspkg"
	"log/slog"
	"net/http"
)

type IHousesControllers interface {
	GetAll(ctx context.Context) ([]House, error)
	Add(ctx context.Context, houses []House) error
	Update(ctx context.Context, house entities.House) error
	Delete(ctx context.Context, houseID int) error
}

type HousesDependencies struct {
	Controller IHousesControllers
	Logger     *slog.Logger
}

type Houses struct {
	controller IHousesControllers
	logger     *slog.Logger
}

func NewHouses(dep HousesDependencies) (*Houses, error) {
	if dep.Logger == nil {
		return nil, errorspkg.NewErrConstructorDependencies("NewHouses", "Logger", "nil")
	}
	if dep.Controller == nil {
		return nil, errorspkg.NewErrConstructorDependencies("NewHouses", "Controller", "nil")
	}

	logger := dep.Logger.With("Handler", "Houses")

	return &Houses{
		controller: dep.Controller,
		logger:     logger,
	}, nil
}

func (h *Houses) GetAll(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	houses, err := h.controller.GetAll(ctx)
	if err != nil {
		h.logger.Error(err.Error(), "method", "GetAll")
		api.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	api.WriteJSON(w, http.StatusOK, houses)
}

func (h *Houses) Add(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var req []House
	if err := api.ReadJSON(r, &req); err != nil {
		api.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := h.controller.Add(ctx, req); err != nil {
		h.logger.Error(err.Error(), "method", "Add")
		api.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	api.WriteJSON(w, http.StatusCreated, map[string]string{"message": "houses created"})
}

func (h *Houses) Update(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := api.URLParamInt(r, "id")
	if err != nil {
		api.WriteError(w, http.StatusBadRequest, err)
		return
	}

	var req entities.House
	if err = api.ReadJSON(r, &req); err != nil {
		api.WriteError(w, http.StatusBadRequest, err)
		return
	}

	req.ID = id

	if err = h.controller.Update(ctx, req); err != nil {
		status := http.StatusInternalServerError
		if errors.As(err, &errorspkg.ErrRepoNotFound{}) {
			status = http.StatusNotFound
		}
		h.logger.Error(err.Error(), "method", "Update")
		api.WriteError(w, status, err)
		return
	}

	api.WriteJSON(w, http.StatusOK, map[string]string{"message": "house updated"})
}

func (h *Houses) Delete(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id, err := api.URLParamInt(r, "id")
	if err != nil {
		api.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err = h.controller.Delete(ctx, id); err != nil {
		status := http.StatusInternalServerError
		if errors.As(err, &errorspkg.ErrRepoNotFound{}) {
			status = http.StatusNotFound
		}
		h.logger.Error(err.Error(), "method", "Delete")
		api.WriteError(w, status, err)
		return
	}

	api.WriteJSON(w, http.StatusOK, nil)
}
