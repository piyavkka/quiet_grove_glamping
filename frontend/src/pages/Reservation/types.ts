export type SlotTime = {
    TimeFrom: string;
    TimeTo: string;
};

export type BathhouseSlot = {
    Date: string;
    Time: SlotTime[];
};

export type Bathhouse = {
    TypeID: number;
    Name: string;
    Slots: BathhouseSlot[];
    FillOption: unknown[];
};

export type AvailableHouse = {
    ID: number;
    BasePrice: number;
    TotalPrice: number;
    Bathhouses: Bathhouse[];
};

export type House = {
    id: number;
    title: string;
    description: string;
    timeFirst: string;
    timeSecond: string;
    people: number;
    cost: number;
    images: string[];
    basePrice?: number;
    totalPrice?: number;
    bathhouses?: Bathhouse[];
};

export interface SaunaSectionProps {
    saunaSlotsData: { date: Date; slots: string[] }[];
    selectedSaunaSlots: Record<string, Set<string>>;
    toggleSlot: (dateKey: string, slot: string) => void;
    addTub: boolean;
    setAddTub: (value: boolean) => void;
    selectedFillId: number;
    setSelectedFillId: (id: number) => void;
}

export interface BookingSummary {
    houseCost: number;
    saunaCost: number;
    tubCost: number;
    tubFillPrice: number;
    total: number;
    saunaHoursCount: number;
    addTub: boolean;
    selectedFillId: number;
}

export interface ContactSectionProps {
    onVerified?: (code: string) => void;
    onSubmitted?: () => void;
    onFinalSubmit: () => void;
    summary: BookingSummary;
}
