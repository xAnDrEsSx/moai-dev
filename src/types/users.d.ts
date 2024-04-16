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
