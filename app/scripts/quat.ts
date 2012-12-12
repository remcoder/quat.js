/// <reference path="../components/jquery-1.8.d.ts" />
class Quat {
    a = 0;
    b = 0;
    c = 0;
    d = 0;

    constructor(a: number[] );
    constructor(a: number, b: number, c: number, d: number);
    constructor(a: any, b?: number, c?: number, d?: number) {
      if ($.isArray(a)) // TODO: do not depend on jQuery
      {
        this.a = 0; // pure imaginary quaternion
        this.b = a[0];
        this.c = a[1];
        this.d = a[2];

        return;
      }

      if (typeof a == "number" && typeof b == "number" && typeof c == "number" && typeof d == "number")
      {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;

        return;
      }

      if (a === undefined && b === undefined && c === undefined && d === undefined)
      {
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.d = 0;

        return;
      }

      throw new Error("Either specify no arguments, 4 numbers or 1 vector.");
    }

    conjugate() : Quat {
      return new Quat(this.a, -this.b, -this.c, -this.d);
    }

    norm() : number {
      return Math.sqrt(this.a*this.a + this.b*this.b + this.c*this.c + this.d*this.d);
    }

    add(q: Quat) : Quat {
      return new Quat(this.a + q.a, this.b + q.b, this.c + q.c, this.d + q.d);
    }

    mul(q: number); // scalar multiplication
    mul(q: Quat); // Hamilton product
    mul(q: any) : Quat {
      var p = this;

      if (typeof q == 'number')
        return new Quat(q*p.a, q*p.b, q*p.c, q*p.d);

      var a = p.a*q.a - p.b*q.b - p.c*q.c - p.d*q.d;
      var b = p.a*q.b + p.b*q.a + p.c*q.d - p.d*q.c;
      var c = p.a*q.c - p.b*q.d + p.c*q.a + p.d*q.b;
      var d = p.a*q.d + p.b*q.c - p.c*q.b + p.d*q.a;
      return new Quat(a,b,c,d);
    }

    inverse() : Quat {
      var p = this;
      var n = p.norm();
      var n2 = n*n;
      return new Quat( p.a/n2, -p.b/n2, -p.c/n2, -p.d/n2 );
    }

    vector() : number[] {
      var p = this;
      return [p.b, p.c, p.d];
    }
}
