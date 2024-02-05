import { z } from "zod";

export const objEmpty = {
    name: '',
    id: crypto.randomUUID(),
};

export const handleStateAddArray = (
    fnSetter: (toSet: (typeof objEmpty)[]) => void,
    currentState: (typeof objEmpty)[]
) =>
    fnSetter([
        ...currentState,
        {
            ...objEmpty,
            id: crypto.randomUUID(),
        },
    ]);

export const handleDeleteState = (
    fnSetter: (toSet: (typeof objEmpty)[]) => void,
    currentState: (typeof objEmpty)[],
    idToDelte: string
) => {
    const clearArr = currentState.filter((itm) => itm.id !== idToDelte);
    fnSetter(clearArr);
};

const stateObjectSchema = z.object({
    id: z.string(),
    nameProduct: z.string(),
    quantity: z.number(),
    price: z.number(),
    subtotal: z.number(),
});

export const formSchemaNewSale = z.object({
    client: z.string(),
    branchOffice: z.string(),
    currency: z.any(),
    details: z.array(stateObjectSchema),
});

export const handleModal = (fnSetter: (p: boolean) => void, currentState: boolean) => fnSetter(!currentState)