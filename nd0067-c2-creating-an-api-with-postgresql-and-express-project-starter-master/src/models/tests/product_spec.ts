import { ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model Spec", () => {
  it("should defined a INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should defined a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should defined a CREATE method", () => {
    expect(store.create).toBeDefined();
  });

  it("should defined a DELETE method", () => {
    expect(store.delete).toBeDefined();
  });

  it("INDEX method should return a list of products", async() => {
    const [{ name, price }] = await store.index();

    expect([{ name, price }]).toEqual([
      {
        name: "Iphone 14",
        price: 2999,
      },
    ]);
  });

  it("SHOW should return a product by product name", async() => {
    const { name, price } = await store.show("Iphone 14");

    expect({ name, price }).toEqual({
      name: "Iphone 14",
      price: 2999,
    });
  });

  it("CREATE should add a product", async() => {
    const { name, price } = await store.create({
      name: "Iphone 14",
      price: 2999,
    });

    expect({ name, price }).toEqual({
      name: "Iphone 14",
      price: 2999,
    });
  });

  it("DELETE should remove a product by product name", async() => {
    await store.delete("Iphone 14");
    const result = await store.show("Iphone 14");

    // @ts-ignore
    expect(result).toBe(undefined);
  });
});