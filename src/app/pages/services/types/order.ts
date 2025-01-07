export class ClientDTO {
  constructor(
    public id: number,

    public name: string
  ) {}
}

export class OrderItemDTO {
  constructor(
    public productId: number,
    public quantity: number,
    public name: string,
    public price: number,
    public imgUrl: string
  ) {}

  // Calcula o subtotal
  get subTotal(): number {
    return this.price * this.quantity;
  }
}

export class OrderDTO {
  id?: number;
  status?: String;
  client?: ClientDTO;
  items: OrderItemDTO[] = [];

  // Calcula o total de todo o carrinho
  get total(): number {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.subTotal;
    });
    return sum;
  }
}
