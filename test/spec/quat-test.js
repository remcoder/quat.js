  (function() {

    assert.almostEquals = function(a,b,max_delta) {
      return assert.isTrue(Math.abs(a-b) <= max_delta);
    }

    describe('Quat.js - basic operations', function() {
      describe('constructor', function() {
        it('should init a,b,c,d to 0' , function () {
          var q = new Quat();
          assert.equal(q.a, 0);
          assert.equal(q.b, 0);
          assert.equal(q.c, 0);
          assert.equal(q.d, 0);
        });
      });

      describe('conjugate', function() {

        it('should negate b,c,d but not a', function() {
            var q = new Quat(1,2,3,4);
            var q2 = q.conjugate();
            assert.equal(q2.a, 1);
            assert.equal(q2.b, -2);
            assert.equal(q2.c, -3);
            assert.equal(q2.d, -4);
        });

        it('conjugate of conjugate q results in q', function() {
            var q = new Quat(1,2,3,4);
            var q2 = q.conjugate();
            var q3 = q2.conjugate();

            assert.equal(q.a, q3.a);
            assert.equal(q.b, q3.b);
            assert.equal(q.c, q3.c);
            assert.equal(q.d, q3.d);
        });

      });

      describe('norm', function() {
        it('of 0 + 0i + 0j + 0k == 0', function() {
          var q = new Quat(0,0,0,0);
          var n = q.norm();

          assert.equal(n, 0);
        });

        it('of 2 + 0i + 0j + 0k == 0', function() {
          var q = new Quat(2,0,0,0);
          var n = q.norm();

          assert.equal(n, 2);
        });

        it('of 2 + 0i + 0j + 0k == 2', function() {
          var q = new Quat(2,0,0,0);
          var n = q.norm();

          assert.equal(n, 2);
        });

        it('of 0 + 2i + 0j + 0k == 2', function() {
          var q = new Quat(0,2,0,0);
          var n = q.norm();

          assert.equal(n, 2);
        });

        it('of 0 + 0i + 2j + 0k == 2', function() {
          var q = new Quat(0,0,2,0);
          var n = q.norm();

          assert.equal(n, 2);
        });

        it('of 0 + 0i + 0j + 2k == 2', function() {
          var q = new Quat(0,0,0,2);
          var n = q.norm();

          assert.equal(n, 2);
        });

        it('of 2 + 2i + 2j + 2k == 4', function() {
          var q = new Quat(2,2,2,2);
          var n = q.norm();

          assert.equal(n, 4);
        });
      });

      describe('add', function() {
        it('should add pair-wise', function() {
          var q1 = new Quat(1,2,3,4);
          var q2 = new Quat(5,7,9,11);
          var q3 = q1.add(q2);

          assert.equal(q3.a, 6);
          assert.equal(q3.b, 9);
          assert.equal(q3.c, 12);
          assert.equal(q3.d, 15);
        })
      });

      describe('mul', function() {
        it('should multiply distributively', function() {
          var q1 = new Quat(1,2,3,4);
          var q2 = new Quat(5,7,9,11);

          var q3 = q1.mul(q2);

          assert.equal(q3.a, -80);
          assert.equal(q3.b, 14);
          assert.equal(q3.c, 30);
          assert.equal(q3.d, 28);
        });
      });

      describe('mul', function() {
        it('should distribute scalar multiplication', function() {
          var q = new Quat(1,2,3,4);
          var s = 3;

          var q2 = q.mul(s);

          assert.equal(q2.a, 3);
          assert.equal(q2.b, 6);
          assert.equal(q2.c, 9);
          assert.equal(q2.d, 12);
        });

      });

      describe('inverse', function() {
        it('inverse(q) == conjugate(q) / norm(q)^2', function() {
          var q = new Quat(1,2,3,4);
          var q2 = q.inverse();


          var q3 = q.conjugate();
          var n = q.norm();
          console.log(n)
          var q4 = q3.mul( 1/(n*n) );

          assert.equal(q2.a, q4.a);
          assert.equal(q2.b, q4.b);
          assert.equal(q2.c, q4.c);
          assert.equal(q2.d, q4.d);
        });
      });

      describe('constructor', function() {
        it('should take a vector as constructor-param', function() {
          var v = [0,1,2];
          var q = new Quat(v);

          assert.equal(q.b, v[0]);
          assert.equal(q.c, v[1]);
          assert.equal(q.d, v[2]);
        })

      });

      describe('vector', function() {
        it('should return a 3-vector', function() {
          var q = new Quat(1,2,3,4);
          var v = q.vector();

          assert.equal(v[0], 2);
          assert.equal(v[1], 3);
          assert.equal(v[2], 4);
        });
      });

      describe('constructor', function() {
        it('should throw an exception when the constructor is passed 2 arguments ', function() {
          assert.throw(function() {
            var q = new Quat(1,2);
          });
        });

        it('should throw an exception when the constructor is passed 3 arguments', function() {
          assert.throw(function() {
            var q = new Quat(1,2,3);
          });
        });

        it('should throw an exception when the constructor is passed 1 argument that is not an array', function() {
          assert.throw(function() {
            var q = new Quat(1);
          });
        });

        it('should throw an exception when the constructor is passed 4 arguments that are not all numbers', function() {
          assert.throw(function() {
            var q = new Quat("hi", {}, [], true);
          });
        });
      });

      describe('rotation', function() {
        it('should rotate', function() {
          // input vector
          var v = [1,0,0];

          // define an axis of rotation ( as a unit vector) ..
          var u = [0,0,1];
          // .. and the angle of rotation
          var a = Math.PI/2;

          // perform quaternion rotation
          var v2 = q_rotate(v, u, a);

          assert.almostEquals(v2[0], 0, 1e-10);
          assert.almostEquals(v2[1], 1, 1e-10);
          assert.almostEquals(v2[2], 0, 1e-10);
        });
      });
    });
  })();
