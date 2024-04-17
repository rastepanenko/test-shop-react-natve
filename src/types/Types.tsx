export interface IUser {
    readonly name: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly token: string,
    readonly signed: boolean,
    readonly orders: IOrder[],
}

export interface ISignInProvider {
    readonly signIn: (email: string, password: string) => Promise<IUser>,
    readonly isLoading: boolean,
}

export interface ISignOutProvider {
    readonly signOut: () => Promise<IUser>,
    readonly errorMessage: string,
    readonly isLoading: boolean,
}

export interface IProductsProvider {
    readonly getProducts: () => Promise<IProduct[]>,
    readonly products: IProduct[],
    readonly isLoading: boolean,
}

export interface IProduct {
    readonly id: number,
    readonly title: string,
    readonly product_type: string,
    readonly price: string,
    readonly image: string | null,
}

export interface Tag {
    readonly name: string;
    isSelected: boolean;
}

export interface IProductFocus {
    readonly product: IProduct;
    readonly isFocused: boolean;
}

export interface ICartItem {
    readonly product: IProduct;
    count: number;
}

export interface IOrder {
    readonly totalPrice: number;
    readonly paymentStatus: boolean;
    readonly adress: string;
    readonly name: string;
    readonly phone: string;
    readonly date: Date;
    readonly products: ICartItem[];
}

export interface IOrderInfo {
    readonly name: string;
    readonly adress: string;
    readonly phone: string;
    readonly cardNumber: string;
    readonly cardExpiry: string;
    readonly cvc: string;
}

export interface ICardData {
    readonly cardNumber: string;
    readonly cardHolder: string;
    readonly cardDate: string;
    readonly cvv: number;
}

export interface IOrderProvider {
    readonly orderWithCard: (orderInfo: IOrderInfo) => Promise<IOrder[]>;
    readonly orderWithCash: (orderInfo: IOrderInfo) => Promise<IOrder[]>;
    readonly isLoading: boolean;
}