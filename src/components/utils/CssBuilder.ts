export class CssBuilder {

    private readonly base: string;
    private s: string;

    constructor(base: string) {
        this.base = base;
        this.s = base;
    }

    addFeature(feature: string, when: boolean = true): CssBuilder {
        if (when == false)
            return this;
        this.s = `${this.s} ${this.base}--${feature}`;
        return this;
    }

    build(): string {
        return this.s;
    }

}