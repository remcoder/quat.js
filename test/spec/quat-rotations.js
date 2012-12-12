(function() {
  describe('Quat.js - rotations', function() {
    describe('rotation 1', function() {
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

    describe('rotation 2', function() {
      it('should rotate #2', function() {
        // input vector
        var v = [1,0,0];

        // define an axis of rotation ( as a unit vector) ..
        var u = [0,0,1];
        // .. and the angle of rotation
        var a = -Math.PI/2;

        // perform quaternion rotation
        var v2 = q_rotate(v, u, a);

        assert.almostEquals(v2[0], 0, 1e-10);
        assert.almostEquals(v2[1], -1, 1e-10);
        assert.almostEquals(v2[2], 0, 1e-10);
      });
    });

    describe('rotation 3', function() {
      it('should rotate', function() {
        // input vector
        var v = [1,0,0];

        // define an axis of rotation ( as a unit vector) ..
        var u = [0,0,1];
        // .. and the angle of rotation
        var a = Math.PI;

        // perform quaternion rotation
        var v2 = q_rotate(v, u, a);

        assert.almostEquals(v2[0], -1, 1e-10);
        assert.almostEquals(v2[1], 0, 1e-10);
        assert.almostEquals(v2[2], 0, 1e-10);
      });
    });

    describe('rotation 4', function() {
      it('should rotate', function() {
        // input vector
        var v = [1,0,0];

        // define an axis of rotation ( as a unit vector) ..
        var u = [0,0,1];
        // .. and the angle of rotation
        var a = -Math.PI;

        // perform quaternion rotation
        var v2 = q_rotate(v, u, a);

        assert.almostEquals(v2[0], -1, 1e-10);
        assert.almostEquals(v2[1], 0, 1e-10);
        assert.almostEquals(v2[2], 0, 1e-10);
      });
    });

    describe('rotation 5', function() {
      it('should rotate', function() {
        // input vector
        var v = [1,0,0];

        // define an axis of rotation ( as a unit vector) ..
        var u = [0,1,0];
        // .. and the angle of rotation
        var a = Math.PI/2;

        // perform quaternion rotation
        var v2 = q_rotate(v, u, a);

        assert.almostEquals(v2[0], 0, 1e-10);
        assert.almostEquals(v2[1], 0, 1e-10);
        assert.almostEquals(v2[2], -1, 1e-10);
      });
    });
  });
}());
