interface IRole {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    modules: IModule[];
}

interface IModule {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}
