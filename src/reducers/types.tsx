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
    current_user: {};
    portfolio_data: PortfolioData;
    loading: boolean;
    has_errors: boolean;
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