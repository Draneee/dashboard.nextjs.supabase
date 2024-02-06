import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Datum } from "./interface";

export const objEmpty = {
    name: '',
    id: crypto.randomUUID(),
    quantity: 0
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
export const handleModal = (fnSetter: (p: boolean) => void, currentState: boolean) => fnSetter(!currentState)

const stateObjectSchema = z.object({
    id: z.string().readonly(),
    nameProduct: z.string().min(1, {
        message: 'Required'
    }),
    quantity: z.number().min(1),
    price: z.string().readonly(),
    subTotal: z.number().readonly(),
});

export const formSchemaNewSale = z.object({
    client: z.string(),
    branchOffice: z.string(),
    currency: z.any(),
    details: z.array(stateObjectSchema),
});


export const calcTotal = (form: UseFormReturn<{
    client: string;
    branchOffice: string;
    details: {
        id: string;
        nameProduct: string;
        quantity: number;
        price: string;
        subTotal: number;
    }[];
    currency?: any;
}, any, {
    client: string;
    branchOffice: string;
    details: {
        id: string;
        nameProduct: string;
        quantity: number;
        price: string;
        subTotal: number;
    }[];
    currency?: any;
}>) => form
    .watch('details')
    .reduce((prev, itm) => prev + itm.subTotal, 0);


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
    currency?: string,
    value?: string | number
) => {
    let formatFn = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency ?? 'usd',
    });

    return formatFn.format(isNaN(Number(value)) ? 0 : Number(value));
};

export const calculateSubTotal = (quantity: string, price: string) =>
    Number(quantity) * Number(price);

export const handleItemState = (fnSet: (str: Datum | undefined) => void, curr: any, value?: Datum) => fnSet(curr ? undefined : value)

export const fnSalesTotal = (sales?: Datum) =>
    sales?.products.reduce((prev, curr) => prev + curr.subtotal, 0);