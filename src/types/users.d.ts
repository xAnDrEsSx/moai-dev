interface IUser {
    userId: string;
    userEmail: string;
    name: string;
    lastName: string;
    password: string;
    documentType: string;
    document: string;
    nacionality: string;
    address: string;
    prefix: number;
    cel: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    fk_status: FkStatus;
    fk_role: FkRole;
    zone: FkRole;
    fk_seller: FkSeller;
}

interface FkRole {
    id: number;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    country?: Country;
}

interface Country {
    id: number;
    name: string;
    code: string;
    createdBy: string;
    createdAt: Date;
}

interface FkSeller {
    id: number;
    bankName: string;
    accountNumber: string;
    accountType: string;
    nationality: null;
}

interface FkStatus {
    statusId: number;
    statusName: string;
    isActive: boolean;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
}

interface IFormUser {
    data?: IUser | null;
    errors: any;
    register: any;
    role?: IRole | null;
    status: "view" | "edit" | "new";
}

interface AccountInformation {
    bank: string;
    id?: number;
    numberAccount: string;
    typeAccount: string;
}

interface Zone {
    country: number;
    destination: string;
    id?: number;
}

interface DtoCreateUserSeller {
    accountInformation: AccountInformation;
    address: string;
    cel: string;
    document: string;
    documentType: string;
    lastName: string;
    nacionality: string;
    name: string;
    prefix: number;
    userEmail: string;
    zone: Zone;
}

interface DtoUpdateUserSeller {
    accountInformation: AccountInformation;
    address: string;
    cel: string;
    document: string;
    documentType: string;
    lastName: string;
    nacionality: string;
    name: string;
    prefix: number;
    userId: string;
    zone: Zone;
}

interface DtoCreateUserAdmin {
    fk_role: number;
    lastName: string;
    name: string;
    userEmail: string;
}

interface DtoUpdateUserAdmin {
    lastName: string;
    name: string;
    userId: string;
}
