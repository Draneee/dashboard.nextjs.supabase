import { PostgrestError } from "@supabase/supabase-js";

export interface SalesData {
    error: PostgrestError | null;
    data: Datum[];
    count: null;
    status: number;
    statusText: string;
}

export interface Datum {
    total: number;
    products: Product[];
    clientId: ClientID;
    branchOfficeId: BranchOfficeID;
}

export interface BranchOfficeID {
    name: string;
    currency: string;
}

export interface ClientID {
    name: string;
}

export interface Product {
    id: string;
    quantity: number;
    subtotal: number;
    nameProduct: string;
}
