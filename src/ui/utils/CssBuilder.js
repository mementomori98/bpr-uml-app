export class CssBuilder {
    constructor(base) {
        this.base = base;
        this.s = base;
    }
    addFeature(feature, when = true) {
        if (when == false)
            return this;
        this.s = `${this.s} ${this.base}--${feature}`;
        return this;
    }
    build() {
        return this.s;
    }
}
//# sourceMappingURL=CssBuilder.js.map