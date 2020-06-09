import { FirebaseError } from "firebase";

export type Balances = {
    total: {};
    eth: {};
    fiat: {};
}; 

export type User = {
    // uid: string;
    [key: string]: any;
}

export interface AuthState {
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    isVerifying: boolean;
    verifyingError: boolean;
    loginError: boolean;
    logoutError: boolean;
    isAuthenticated: boolean;
    user: User;
}

export interface AppRootState {
    user_data: User;
    portfolio_data: PortfolioData;
    symbols: SymbolArr;
    has_errors: {
        status: boolean;
        error: FirebaseError | null;
    };
    loading: boolean;
    last_request: number | null ;
};

export interface PortfolioData {
    wallets: {
        [K: string]: Wallet;
    };
    balance: TBalance;
};

export type Wallet = {
    address: string;
    balance: TBalance;
    tokens: [];
}

export type TBalance = {
    [K in  "eth" | "tokens" | "total" ]: {
        [K in "eth" | "fiat"]: number;
    };
};

export interface StreamRootState {
    data: StreamData;
    loading: boolean;
    open: boolean;
}

export type StreamData = {
    [K: string]: {
        [K: string]: any;
    }
};


export type SymbolArr = Symbol[];
export type Symbol = {
    symbol: string,
    status: string,
    baseAsset: string,
    baseAssetPrecision: number,
    quoteAsset: string,
    quotePrecision: number,
    quoteAssetPrecision: number,
    baseCommissionPrecision: number,
    quoteCommissionPrecision: number,
};