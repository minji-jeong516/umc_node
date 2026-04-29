export interface CreateStoreRequest {
  name: string;
  address: string;
}

export const bodyToStore = (body: CreateStoreRequest) => {
  return {
    name: body.name,
    address: body.address,
  };
};