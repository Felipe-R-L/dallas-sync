import { UniqueEntityID } from "src/core/entities/unique-entity-id";

import { Tenant } from "../../enterprise/entities/tenant.entity";

export abstract class TenantsRepository {
  abstract create(tenant: Tenant): Promise<void>
  abstract findAll(): Promise<Tenant[]>
  abstract findById(id: UniqueEntityID): Promise<Tenant | null>
  abstract findByCnpj(cnpj: string): Promise<Tenant | null>
  abstract update(tenant: Tenant): Promise<void>
  abstract delete(id: UniqueEntityID): Promise<void>
  abstract restore(id: UniqueEntityID): Promise<void>
}