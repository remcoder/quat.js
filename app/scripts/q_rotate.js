function q_rotate(v, u, a) {
    var q = new Quat(Math.cos(a / 2), u[0] * Math.sin(a / 2), u[1] * Math.sin(a / 2), u[2] * Math.sin(a / 2));
    var v_ = new Quat(v);
    var q2 = q.mul(v_).mul(q.conjugate());
    return q2.vector();
}
