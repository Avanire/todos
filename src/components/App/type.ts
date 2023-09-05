export type TTask = {
    id: string,
    name: string,
    status: boolean
}

export type TTaskItem = {
    task: TTask,
    handleChangeInput: (id: string) => void
}

export type TSort = 'All' | 'Active' | 'Completed';
