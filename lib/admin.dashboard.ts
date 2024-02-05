import { UseFormReturn } from "react-hook-form";
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

export const calcTotal = (form: UseFormReturn<{
    client: string;
    branchOffice: string;
    details: {
        id: string;
        nameProduct: string;
        quantity: number;
        price: number;
        subtotal: number;
    }[];
    currency?: any;
}, any, {
    client: string;
    branchOffice: string;
    details: {
        id: string;
        nameProduct: string;
        quantity: number;
        price: number;
        subtotal: number;
    }[];
    currency?: any;
}>) => form
    .watch('details')
    .reduce((prev, itm) => prev + itm.subtotal, 0);


export const formatedDataClient = (data: any[] | null) => data?.map(itm => {
    return {
        value: itm.id,
        label: itm.name
    }
})