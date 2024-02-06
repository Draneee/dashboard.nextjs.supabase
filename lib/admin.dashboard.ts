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
    quantity: z.any(),
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
    details: {
        id: string;
        nameProduct: string;
        price: number;
        subtotal: number;
        quantity?: any;
    }[];
    client: string;
    branchOffice: string;
    currency?: any;
}, any, {
    details: {
        id: string;
        nameProduct: string;
        price: number;
        subtotal: number;
        quantity?: any;
    }[];
    client: string;
    branchOffice: string;
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

export const formatBranchOffice = (brOf: any[] | null) => brOf?.map(itm => {
    return {
        value: itm.id,
        label: itm.name
    }
})

export const arrFindById = (id: string, data: any[] | null) => data?.find((itm) => itm.id === id);

export const formatedPriceByCurrency = (
    currency: string,
    value: string | number
) => {
    let formatFn = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency ?? 'usd',
    });

    return formatFn.format(isNaN(Number(value)) ? 0 : Number(value));
};