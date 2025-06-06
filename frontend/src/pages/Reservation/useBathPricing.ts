import {fillOptions, Sauna} from "../../components/Data/BathData";

export function useBathPricing(selectedSaunaSlots: Record<string, Set<string>>, addTub: boolean, selectedFillId: number) {
    const saunaHoursCount = Object.values(selectedSaunaSlots).reduce((sum, set) => sum + set.size, 0);

    const saunaPrice = Sauna.find(s => s.id === 1)?.price ?? 0;
    const tubBasePrice = Sauna.find(s => s.id === 2)?.price ?? 0;

    const saunaCost = saunaHoursCount * saunaPrice;
    const isTubFree = saunaHoursCount >= 2;

    const tubCost = addTub && !isTubFree ? tubBasePrice : 0;
    const tubFillPrice = addTub ? (fillOptions.find(f => f.id === selectedFillId)?.price ?? 0) : 0;

    return {
        saunaHoursCount,
        saunaCost,
        tubBasePrice,
        isTubFree,
        tubCost,
        tubFillPrice,
    };
}
