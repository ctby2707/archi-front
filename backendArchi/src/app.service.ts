import { Injectable } from '@nestjs/common';
import { Pin, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  prisma = new PrismaClient();
  getHello(): string {
    return `Hello`;
  }

  async pin(
    pinWhereUniqueInput: Prisma.PinWhereUniqueInput,
  ): Promise<Pin | null> {
    return this.prisma.pin.findUnique({ where: pinWhereUniqueInput });
  }

  async pins(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PinWhereUniqueInput;
    where?: Prisma.PinWhereInput;
    orderBy?: Prisma.PinOrderByWithRelationInput;
  }): Promise<Pin[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pin.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPin(data: Prisma.PinCreateInput): Promise<Pin> {
    return this.prisma.pin.create({ data });
  }

  async updatePin(params: {
    where: Prisma.PinWhereUniqueInput;
    data: Prisma.PinUpdateInput;
  }): Promise<Pin> {
    const { where, data } = params;
    return this.prisma.pin.update({ where, data });
  }

  async deletePin(where: Prisma.PinWhereUniqueInput): Promise<Pin> {
    return this.prisma.pin.delete({ where });
  }
}
