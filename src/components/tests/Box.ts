export class Box {
    private static nextId: bigint = BigInt(0);

    public id: bigint;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number, id: bigint = null) {
        this.id = id ?? Box.nextId++;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}