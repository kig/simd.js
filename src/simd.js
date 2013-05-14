function SIMD(global, foreign, heap) {
	"use asm";

	var IMM8_eq = 0;
	var IMM8_lt = 1;
	var IMM8_le = 2;
	var IMM8_unord = 3;
	var IMM8_neq = 4;
	var IMM8_nlt = 5;
	var IMM8_nle = 6;
	var IMM8_ord = 7;

	var sqrt = global.Math.sqrt;

	var pd = new global.Float64Array(heap);
	var ps = new global.Float32Array(heap);
	var pib = new global.Int8Array(heap);
	var piw = new global.Int16Array(heap);
	var pid = new global.Int32Array(heap);

	function maxd(a, b) {
		a = +a;
		b = +b;
		if (b > a) {
			a = b;
		}
		return +a;
	};

	function mind(a, b) {
		a = +a;
		b = +b;
		if (b < a) {
			a = b;
		}
		return +a;
	};

	function addpd() {
		pd[0] = +pd[0] + +pd[2];
		pd[1] = +pd[1] + +pd[3];
	};

	function subpd() {
		pd[0] = +pd[0] - +pd[2];
		pd[1] = +pd[1] - +pd[3];
	};

	function mulpd() {
		pd[0] = +pd[0] * +pd[2];
		pd[1] = +pd[1] * +pd[3];
	};

	function divpd() {
		pd[0] = +pd[0] / +pd[2];
		pd[1] = +pd[1] / +pd[3];
	};

	function maxpd() {
		pd[0] = +maxd(+pd[0], +pd[2]);
		pd[1] = +maxd(+pd[1], +pd[3]);
	};

	function minpd() {
		pd[0] = +mind(+pd[0], +pd[2]);
		pd[1] = +mind(+pd[1], +pd[3]);
	};

	function sqrtpd() {
		pd[0] = +sqrt(+pd[2]);
		pd[1] = +sqrt(+pd[3]);
	};


	function addps() {
		ps[0] = +ps[0] + +ps[4];
		ps[1] = +ps[1] + +ps[5];
		ps[2] = +ps[2] + +ps[6];
		ps[3] = +ps[3] + +ps[7];
	};

	function subps() {
		ps[0] = +ps[0] - +ps[4];
		ps[1] = +ps[1] - +ps[5];
		ps[2] = +ps[2] - +ps[6];
		ps[3] = +ps[3] - +ps[7];
	};

	function mulps() {
		ps[0] = +ps[0] * +ps[4];
		ps[1] = +ps[1] * +ps[5];
		ps[2] = +ps[2] * +ps[6];
		ps[3] = +ps[3] * +ps[7];
	};

	function divps() {
		ps[0] = +ps[0] / +ps[4];
		ps[1] = +ps[1] / +ps[5];
		ps[2] = +ps[2] / +ps[6];
		ps[3] = +ps[3] / +ps[7];
	};

	function maxps() {
		ps[0] = +maxd(+ps[0], +ps[4]);
		ps[1] = +maxd(+ps[1], +ps[5]);
		ps[2] = +maxd(+ps[2], +ps[6]);
		ps[3] = +maxd(+ps[3], +ps[7]);
	};

	function minps() {
		ps[0] = +mind(+ps[0], +ps[4]);
		ps[1] = +mind(+ps[1], +ps[5]);
		ps[2] = +mind(+ps[2], +ps[6]);
		ps[3] = +mind(+ps[3], +ps[7]);
	};

	function sqrtps() {
		ps[0] = +sqrt(+ps[4]);
		ps[1] = +sqrt(+ps[5]);
		ps[2] = +sqrt(+ps[6]);
		ps[3] = +sqrt(+ps[7]);
	};

	return {
		addpd: addpd,
		subpd: subpd,
		mulpd: mulpd,
		divpd: divpd,
		maxpd: maxpd,
		minpd: minpd,
		sqrtpd: sqrtpd,

		addps: addps,
		subps: subps,
		mulps: mulps,
		divps: divps,
		maxps: maxps,
		minps: minps,
		sqrtps: sqrtps
	};

/*
	function andnpd(a, b) {
		a[0] = !(a[0] & b[0]);
		a[1] = !(a[1] & b[1]);
	};

	function andpd(a, b) {
		a[0] = (a[0] & b[0]);
		a[1] = (a[1] & b[1]);
	};

	function orpd(a, b) {
		a[0] = (a[0] | b[0]);
		a[1] = (a[1] | b[1]);
	};

	function xorpd(a, b) {
		a[0] = (a[0] ^ b[0]);
		a[1] = (a[1] ^ b[1]);
	};

	function cmppd(a, b, pred) {
		var t = 0xFFFFFFFFFFFFFFFF;
		var f = 0x0000000000000000;
		switch(pred) {
		case(SSE2.IMM8.eq):
		a[0] = (a[0] === b[0] ? t : f);
		a[1] = (a[1] === b[1] ? t : f);
		break;
		case(SSE2.IMM8.lt):
		a[0] = (a[0] < b[0] ? t : f);
		a[1] = (a[1] < b[1] ? t : f);
		break;
		case(SSE2.IMM8.le):
		a[0] = (a[0] <= b[0] ? t : f);
		a[1] = (a[1] <= b[1] ? t : f);
		break;
		case(SSE2.IMM8.unord):
		a[0] = ((isNaN(a[0]) || isNaN(b[0])) ? t : f);
		a[1] = ((isNaN(a[1]) || isNaN(b[1])) ? t : f);
		break;
		case(SSE2.IMM8.neq):
		a[0] = ((a[0] !== b[0]) ? t : f);
		a[1] = ((a[1] !== b[1]) ? t : f);
		break;
		case(SSE2.IMM8.nlt):
		a[0] = (!(a[0] < b[0]) ? t : f);
		a[1] = (!(a[1] < b[1]) ? t : f);
		break;
		case(SSE2.IMM8.nle):
		a[0] = (!(a[0] <= b[0]) ? t : f);
		a[1] = (!(a[1] <= b[1]) ? t : f);
		break;
		case(SSE2.IMM8.ord):
		a[0] = (!(isNaN(a[0]) || isNaN(b[0])) ? t : f);
		a[1] = (!(isNaN(a[1]) || isNaN(b[1])) ? t : f);
		break;
		}
	};

	function addps(a, b) {
		a[0] += b[0];
		a[1] += b[1];
		a[2] += b[2];
		a[3] += b[3];
	};

	function subps(a, b) {
		a[0] -= b[0];
		a[1] -= b[1];
		a[2] -= b[2];
		a[3] -= b[3];
	};

	function mulps(a, b) {
		a[0] *= b[0];
		a[1] *= b[1];
		a[2] *= b[2];
		a[3] *= b[3];
	};

	function divps(a, b) {
		a[0] /= b[0];
		a[1] /= b[1];
		a[2] /= b[2];
		a[3] /= b[3];
	};

	function maxps(a, b) {
		a[0] = Math.max(a[0], b[0]);
		a[1] = Math.max(a[1], b[1]);
		a[2] = Math.max(a[2], b[2]);
		a[3] = Math.max(a[3], b[3]);
	};

	function minps(a, b) {
		a[0] = Math.min(a[0], b[0]);
		a[1] = Math.min(a[1], b[1]);
		a[2] = Math.min(a[2], b[2]);
		a[3] = Math.min(a[3], b[3]);
	};

	function sqrtps(a, b) {
		a[0] = Math.sqrt(b[0]);
		a[1] = Math.sqrt(b[1]);
		a[2] = Math.sqrt(b[2]);
		a[3] = Math.sqrt(b[3]);
	};

	function andnps(a, b) {
		a[0] = !(a[0] & b[0]);
		a[1] = !(a[1] & b[1]);
		a[2] = !(a[2] & b[2]);
		a[3] = !(a[3] & b[3]);
	};

	function andps(a, b) {
		a[0] = (a[0] & b[0]);
		a[1] = (a[1] & b[1]);
		a[2] = (a[2] & b[2]);
		a[3] = (a[3] & b[3]);
	};

	function orps(a, b) {
		a[0] = (a[0] | b[0]);
		a[1] = (a[1] | b[1]);
		a[2] = (a[2] | b[2]);
		a[3] = (a[3] | b[3]);
	};

	function xorps(a, b) {
		a[0] = (a[0] ^ b[0]);
		a[1] = (a[1] ^ b[1]);
		a[2] = (a[2] ^ b[2]);
		a[3] = (a[3] ^ b[3]);
	};

	function cmpps(a, b, pred) {
		var t = 0xFFFFFFFF;
		var f = 0x00000000;
		switch(pred) {
		case(SSE2.IMM8.eq):
		a[0] = (a[0] === b[0] ? t : f);
		a[1] = (a[1] === b[1] ? t : f);
		a[2] = (a[2] === b[2] ? t : f);
		a[3] = (a[3] === b[3] ? t : f);
		break;
		case(SSE2.IMM8.lt):
		a[0] = (a[0] < b[0] ? t : f);
		a[1] = (a[1] < b[1] ? t : f);
		a[2] = (a[2] < b[2] ? t : f);
		a[3] = (a[3] < b[3] ? t : f);
		break;
		case(SSE2.IMM8.le):
		a[0] = (a[0] <= b[0] ? t : f);
		a[1] = (a[1] <= b[1] ? t : f);
		a[2] = (a[2] <= b[2] ? t : f);
		a[3] = (a[3] <= b[3] ? t : f);
		break;
		case(SSE2.IMM8.unord):
		a[0] = ((isNaN(a[0]) || isNaN(b[0])) ? t : f);
		a[1] = ((isNaN(a[1]) || isNaN(b[1])) ? t : f);
		a[2] = ((isNaN(a[2]) || isNaN(b[2])) ? t : f);
		a[3] = ((isNaN(a[3]) || isNaN(b[3])) ? t : f);
		break;
		case(SSE2.IMM8.neq):
		a[0] = ((a[0] !== b[0]) ? t : f);
		a[1] = ((a[1] !== b[1]) ? t : f);
		a[2] = ((a[2] !== b[2]) ? t : f);
		a[3] = ((a[3] !== b[3]) ? t : f);
		break;
		case(SSE2.IMM8.nlt):
		a[0] = (!(a[0] < b[0]) ? t : f);
		a[1] = (!(a[1] < b[1]) ? t : f);
		a[2] = (!(a[2] < b[2]) ? t : f);
		a[3] = (!(a[3] < b[3]) ? t : f);
		break;
		case(SSE2.IMM8.nle):
		a[0] = (!(a[0] <= b[0]) ? t : f);
		a[1] = (!(a[1] <= b[1]) ? t : f);
		a[2] = (!(a[2] <= b[2]) ? t : f);
		a[3] = (!(a[3] <= b[3]) ? t : f);
		break;
		case(SSE2.IMM8.ord):
		a[0] = (!(isNaN(a[0]) || isNaN(b[0])) ? t : f);
		a[1] = (!(isNaN(a[1]) || isNaN(b[1])) ? t : f);
		a[2] = (!(isNaN(a[2]) || isNaN(b[2])) ? t : f);
		a[3] = (!(isNaN(a[3]) || isNaN(b[3])) ? t : f);
		break;
		}
	};

	function paddb(a, b) {
		a[0] += b[0];
		a[1] += b[1];
		a[2] += b[2];
		a[3] += b[3];
		a[4] += b[4];
		a[5] += b[5];
		a[6] += b[6];
		a[7] += b[7];
		a[8] += b[8];
		a[9] += b[9];
		a[10] += b[10];
		a[11] += b[11];
		a[12] += b[12];
		a[13] += b[13];
		a[14] += b[14];
		a[15] += b[15];
	};

	function paddw(a, b) {
		a[0] += b[0];
		a[1] += b[1];
		a[2] += b[2];
		a[3] += b[3];
		a[4] += b[4];
		a[5] += b[5];
		a[6] += b[6];
		a[7] += b[7];
	};

	function paddd(a, b) {
		a[0] += b[0];
		a[1] += b[1];
		a[2] += b[2];
		a[3] += b[3];
	};

	function paddq(a, b) {
		a[0] += b[0];
		a[1] += b[1];
	};

	function psubb(a, b) {
		a[0] -= b[0];
		a[1] -= b[1];
		a[2] -= b[2];
		a[3] -= b[3];
		a[4] -= b[4];
		a[5] -= b[5];
		a[6] -= b[6];
		a[7] -= b[7];
		a[8] -= b[8];
		a[9] -= b[9];
		a[10] -= b[10];
		a[11] -= b[11];
		a[12] -= b[12];
		a[13] -= b[13];
		a[14] -= b[14];
		a[15] -= b[15];
	};

	function psubw(a, b) {
		a[0] -= b[0];
		a[1] -= b[1];
		a[2] -= b[2];
		a[3] -= b[3];
		a[4] -= b[4];
		a[5] -= b[5];
		a[6] -= b[6];
		a[7] -= b[7];
	};

	function psubd(a, b) {
		a[0] -= b[0];
		a[1] -= b[1];
		a[2] -= b[2];
		a[3] -= b[3];
	};

	function psubq(a, b) {
		a[0] -= b[0];
		a[1] -= b[1];
	};
*/

};
