class Print {
  public execute(name?: string) {
    console.log(`-----正在执行 ${name}-----`);
  }
}

function PrintFactory() {
  return new Print();
}

export const print = PrintFactory();
