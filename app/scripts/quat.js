var Quat = (function () {
    function Quat(a, b, c, d) {
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.d = 0;
        if($.isArray(a)) {
            this.a = 0;
            this.b = a[0];
            this.c = a[1];
            this.d = a[2];
            return;
        }
        if(typeof a == "number" && typeof b == "number" && typeof c == "number" && typeof d == "number") {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            return;
        }
        if(a === undefined && b === undefined && c === undefined && d === undefined) {
            this.a = 0;
            this.b = 0;
            this.c = 0;
            this.d = 0;
            return;
        }
        throw new Error("Either specify no arguments, 4 numbers or 1 vector.");
    }
    Quat.prototype.conjugate = function () {
        return new Quat(this.a, -this.b, -this.c, -this.d);
    };
    Quat.prototype.norm = function () {
        return Math.sqrt(this.a * this.a + this.b * this.b + this.c * this.c + this.d * this.d);
    };
    Quat.prototype.add = function (q) {
        return new Quat(this.a + q.a, this.b + q.b, this.c + q.c, this.d + q.d);
    };
    Quat.prototype.mul = function (q) {
        var p = this;
        if(typeof q == 'number') {
            return new Quat(q * p.a, q * p.b, q * p.c, q * p.d);
        }
        var a = p.a * q.a - p.b * q.b - p.c * q.c - p.d * q.d;
        var b = p.a * q.b + p.b * q.a + p.c * q.d - p.d * q.c;
        var c = p.a * q.c - p.b * q.d + p.c * q.a + p.d * q.b;
        var d = p.a * q.d + p.b * q.c - p.c * q.b + p.d * q.a;
        return new Quat(a, b, c, d);
    };
    Quat.prototype.inverse = function () {
        var p = this;
        var n = p.norm();
        var n2 = n * n;
        return new Quat(p.a / n2, -p.b / n2, -p.c / n2, -p.d / n2);
    };
    Quat.prototype.vector = function () {
        var p = this;
        return [
            p.b, 
            p.c, 
            p.d
        ];
    };
    return Quat;
})();
