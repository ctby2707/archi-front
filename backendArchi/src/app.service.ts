import { Injectable } from '@nestjs/common';
import { Pin, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  master = new PrismaClient();
  //declare second prisma client linked to the slave
  slave = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://adminuser:password@pgslavearchi.westeurope.cloudapp.azure.com:5432/DATABASE',
      },
    },
  });
  getHello(): string {
    return `Hello`;
  }

  randInt = Math.floor(Math.random() * 2);

  async pin(
    pinWhereUniqueInput: Prisma.PinWhereUniqueInput,
  ): Promise<Pin | null> {
    const randInt = Math.floor(Math.random() * 2);
    if (randInt === 0) {
      //try master first
      try {
        return this.master.pin.findUnique({ where: pinWhereUniqueInput });
      } catch (error) {
        try {
          return this.slave.pin.findUnique({ where: pinWhereUniqueInput });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      // try slave first
      try {
        return this.slave.pin.findUnique({ where: pinWhereUniqueInput });
      } catch (error) {
        try {
          return this.master.pin.findUnique({ where: pinWhereUniqueInput });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  async pins(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PinWhereUniqueInput;
    where?: Prisma.PinWhereInput;
    orderBy?: Prisma.PinOrderByWithRelationInput;
  }): Promise<Pin[]> {
    const { skip, take, cursor, where, orderBy } = params;

    const randInt = Math.floor(Math.random() * 2);
    if (randInt === 0) {
      //try master first
      try {
        return this.master.pin.findMany({
          skip,
          take,
          cursor,
          where,
          orderBy,
        });
      } catch (error) {
        try {
          return this.slave.pin.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      // try slave first
      try {
        return this.slave.pin.findMany({
          skip,
          take,
          cursor,
          where,
          orderBy,
        });
      } catch (error) {
        try {
          return this.master.pin.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    return this.master.pin.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPin(data: Prisma.PinCreateInput): Promise<Pin> {
    let pin = null;
    try {
      pin = this.master.pin.create({ data });
      this.slave.pin.create({ data });
    } catch (error) {
      try {
        pin = this.slave.pin.create({ data });
      } catch (error) {
        console.log(error);
      }
    }
    return pin;
  }

  async updatePin(params: {
    where: Prisma.PinWhereUniqueInput;
    data: Prisma.PinUpdateInput;
  }): Promise<Pin> {
    const { where, data } = params;
    let pin = null;
    try {
      pin = this.master.pin.update({ where, data });
      this.slave.pin.update({ where, data });
    } catch (error) {
      //master db is crashed, still have to call slave
      try {
        pin = this.slave.pin.update({ where, data });
      } catch (error) {
        console.log(error);
      }
    }
    return pin;
  }

  async deletePin(where: Prisma.PinWhereUniqueInput): Promise<Pin> {
    let pin = null;
    try {
      pin = this.master.pin.delete({ where });
      this.slave.pin.delete({ where });
    } catch (error) {
      //master db is crashed, still have to call slave
      try {
        pin = this.slave.pin.delete({ where });
      } catch (error) {
        console.log(error);
      }
    }
    return pin;
  }
}
