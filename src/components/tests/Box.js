export class Box {
    constructor(x, y, width, height, id = null) {
        this.id = id !== null && id !== void 0 ? id : Box.nextId++;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
Box.nextId = BigInt(0);
//# sourceMappingURL=Box.js.map