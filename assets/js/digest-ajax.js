/*(c) 2014 Kynec Studios, Andrew Mitchell | MIT License opensource.org/licenses/MIT */
(function (a) {
	DigestAjax = function () {};
	DigestAjax.authHelper = function () {
		return { username: "", password: "" };
	};
	DigestAjax.UNAUTH_HA1 = null;
	DigestAjax.AUTH_HA1 = null;
	DigestAjax.UNAUTH_USERNAME = null;
	DigestAjax.AUTH_USERNAME = null;
	DigestAjax.WWW_AUTHENTICATE = "WWW-Authenticate";
	DigestAjax.ajaxDigest = function (c, e, f, k) {
		var o = {},
			n,
			d;
		var j = document.createElement("a");
		if (typeof c === "object") {
			o = c;
			j.href = o.url;
		} else {
			if (typeof c === "string") {
				if (typeof e === "string") {
					n = e ? e : null;
					d = f ? f : null;
				} else {
					if (typeof e === "object") {
						o = e ? e : {};
						n = f ? f : null;
						d = k ? k : null;
					}
				}
				j.href = c;
				o.url = c;
			}
		}
		o = a.extend(
			{
				requestUri: j.pathname + j.search,
				username: n,
				password: d,
				type: "GET",
			},
			o
		);
		var m = a.Deferred();
		return m.promise(l());
		function l() {
			return a
				.ajax(o)
				.done(function (q, r, p) {
					m.resolve(q, r, p);
				})
				.fail(function (p, r, q) {
					if (p.status === 401 || p.status === 407) {
						h(g(p));
					} else {
						m.reject(p, r, q);
					}
				});
		}
		function h(p) {
			if (o.headers === undefined) {
				o.headers = {};
			}
			o.headers.Authorization = p;
			return a
				.ajax(o)
				.done(function (r, s, q) {
					if (DigestAjax.UNAUTH_HA1 !== null) {
						DigestAjax.AUTH_HA1 = DigestAjax.UNAUTH_HA1;
						DigestAjax.UNAUTH_HA1 = null;
					}
					if (DigestAjax.UNAUTH_USERNAME !== null) {
						DigestAjax.AUTH_USERNAME = DigestAjax.UNAUTH_USERNAME;
						DigestAjax.UNAUTH_USERNAME = null;
					}
					m.resolve(r, s, q);
				})
				.fail(function (q, s, r) {
					if (q.status === 401 || q.status === 407) {
						DigestAjax.AUTH_HA1 = null;
						DigestAjax.AUTH_USERNAME = null;
					}
					m.reject(q, s, r);
				});
		}
		function g(D) {
			var v = D.getResponseHeader(DigestAjax.WWW_AUTHENTICATE);
			if (v !== undefined && v !== null) {
				var s = b(v);
				var p = s.qop;
				var B = "auth";
				if (p !== undefined && p.toLowerCase() === "auth-int") {
					B = "auth-int";
				}
				var x = s.algorithm;
				var A;
				var u;
				var C;
				if (DigestAjax.AUTH_HA1 !== null) {
					A = DigestAjax.AUTH_HA1;
					u = DigestAjax.AUTH_USERNAME;
				} else {
					if (o.username === null || o.password === null) {
						var q = a.extend(
							{ username: "", password: "" },
							DigestAjax.authHelper()
						);
						a.extend(o, q);
					}
					if (x !== undefined && x.toLowerCase() === "md5-sess") {
						C = i();
						A = CryptoJS.MD5(
							CryptoJS.MD5(o.username + ":" + s.realm + ":" + o.password) +
								":" +
								s.nonce +
								":" +
								C
						);
					} else {
						A = CryptoJS.MD5(o.username + ":" + s.realm + ":" + o.password);
					}
					u = o.username;
					DigestAjax.UNAUTH_HA1 = A;
					DigestAjax.UNAUTH_USERNAME = o.username;
				}
				var y, r;
				if (B === "auth-int") {
					var w = o.data ? o.data : "";
					y = CryptoJS.MD5(o.type + ":" + o.requestUri + ":" + CryptoJS.MD5(w));
				} else {
					y = CryptoJS.MD5(o.type + ":" + o.requestUri);
				}
				var r, t;
				if (s.qop === undefined) {
					r = CryptoJS.MD5(A + ":" + s.nonce + ":" + y);
				} else {
					if (C === undefined) {
						C = i();
					}
					t = "00000001";
					r = CryptoJS.MD5(
						A + ":" + s.nonce + ":" + t + ":" + C + ":" + B + ":" + y
					);
				}
				var z = [];
				z.push('Digest username="', u, '",');
				z.push('realm="', s.realm, '",');
				z.push('nonce="', s.nonce, '",');
				z.push('uri="', o.requestUri, '",');
				z.push("qop=", B, ",");
				if (t !== undefined) {
					z.push("nc=", t, ",");
				}
				if (C !== undefined) {
					z.push('cnonce="', C, '",');
				}
				if (s.opaque !== undefined) {
					z.push('opaque="', s.opaque, '",');
				}
				z.push('response="', r, '"');
				return z.join("");
			}
		}
		function b(s) {
			var r = {};
			var q = /([^"',\s]*)="([^"]*)/gm;
			var p = null;
			do {
				p = q.exec(s);
				if (p !== null) {
					r[p[1]] = p[2];
				}
			} while (p !== null);
			return r;
		}
		function i() {
			var p = "abcdef0123456789";
			var s = "";
			for (var r = 0; r < 8; r++) {
				var q = Math.floor(Math.random() * p.length);
				s += p.substr(q, 1);
			}
			return s;
		}
	};
	DigestAjax.ajaxDigestType = function (e, c, d, f, b) {
		if (typeof d === "string") {
			b = f;
			f = d;
		}
		if (typeof d !== "object") {
			d = {};
		}
		d.type = e;
		return DigestAjax.ajaxDigest(c, d, f, b);
	};
	DigestAjax.getDigest = function (c, d, e, b) {
		return DigestAjax.ajaxDigestType("GET", c, d, e, b);
	};
	DigestAjax.postDigest = function (c, d, e, b) {
		return DigestAjax.ajaxDigestType("POST", c, d, e, b);
	};
	DigestAjax.putDigest = function (c, d, e, b) {
		return DigestAjax.ajaxDigestType("PUT", c, d, e, b);
	};
	DigestAjax.deleteDigest = function (c, d, e, b) {
		return DigestAjax.ajaxDigestType("DELETE", c, d, e, b);
	};
	a.extend({
		authHelper: function (b) {
			DigestAjax.authHelper = b;
		},
		ajaxDigest: DigestAjax.ajaxDigest,
		ajaxDigestType: DigestAjax.ajaxDigestType,
		getDigest: DigestAjax.getDigest,
		postDigest: DigestAjax.postDigest,
		putDigest: DigestAjax.putDigest,
		deleteDigest: DigestAjax.deleteDigest,
	});
})(jQuery);
var CryptoJS =
	CryptoJS ||
	(function (z, d) {
		var f = {},
			h = (f.lib = {}),
			e = function () {},
			b = (h.Base = {
				extend: function (a) {
					e.prototype = this;
					var g = new e();
					a && g.mixIn(a);
					g.hasOwnProperty("init") ||
						(g.init = function () {
							g.$super.init.apply(this, arguments);
						});
					g.init.prototype = g;
					g.$super = this;
					return g;
				},
				create: function () {
					var a = this.extend();
					a.init.apply(a, arguments);
					return a;
				},
				init: function () {},
				mixIn: function (a) {
					for (var g in a) {
						a.hasOwnProperty(g) && (this[g] = a[g]);
					}
					a.hasOwnProperty("toString") && (this.toString = a.toString);
				},
				clone: function () {
					return this.init.prototype.extend(this);
				},
			}),
			c = (h.WordArray = b.extend({
				init: function (a, g) {
					a = this.words = a || [];
					this.sigBytes = g != d ? g : 4 * a.length;
				},
				toString: function (a) {
					return (a || y).stringify(this);
				},
				concat: function (k) {
					var n = this.words,
						l = k.words,
						m = this.sigBytes;
					k = k.sigBytes;
					this.clamp();
					if (m % 4) {
						for (var p = 0; p < k; p++) {
							n[(m + p) >>> 2] |=
								((l[p >>> 2] >>> (24 - 8 * (p % 4))) & 255) <<
								(24 - 8 * ((m + p) % 4));
						}
					} else {
						if (65535 < l.length) {
							for (p = 0; p < k; p += 4) {
								n[(m + p) >>> 2] = l[p >>> 2];
							}
						} else {
							n.push.apply(n, l);
						}
					}
					this.sigBytes += k;
					return this;
				},
				clamp: function () {
					var a = this.words,
						g = this.sigBytes;
					a[g >>> 2] &= 4294967295 << (32 - 8 * (g % 4));
					a.length = z.ceil(g / 4);
				},
				clone: function () {
					var a = b.clone.call(this);
					a.words = this.words.slice(0);
					return a;
				},
				random: function (g) {
					for (var l = [], k = 0; k < g; k += 4) {
						l.push((4294967296 * z.random()) | 0);
					}
					return new c.init(l, g);
				},
			})),
			w = (f.enc = {}),
			y = (w.Hex = {
				stringify: function (l) {
					var m = l.words;
					l = l.sigBytes;
					for (var q = [], p = 0; p < l; p++) {
						var n = (m[p >>> 2] >>> (24 - 8 * (p % 4))) & 255;
						q.push((n >>> 4).toString(16));
						q.push((n & 15).toString(16));
					}
					return q.join("");
				},
				parse: function (k) {
					for (var l = k.length, n = [], m = 0; m < l; m += 2) {
						n[m >>> 3] |= parseInt(k.substr(m, 2), 16) << (24 - 4 * (m % 8));
					}
					return new c.init(n, l / 2);
				},
			}),
			o = (w.Latin1 = {
				stringify: function (k) {
					var l = k.words;
					k = k.sigBytes;
					for (var n = [], m = 0; m < k; m++) {
						n.push(
							String.fromCharCode((l[m >>> 2] >>> (24 - 8 * (m % 4))) & 255)
						);
					}
					return n.join("");
				},
				parse: function (k) {
					for (var l = k.length, n = [], m = 0; m < l; m++) {
						n[m >>> 2] |= (k.charCodeAt(m) & 255) << (24 - 8 * (m % 4));
					}
					return new c.init(n, l);
				},
			}),
			x = (w.Utf8 = {
				stringify: function (a) {
					try {
						return decodeURIComponent(escape(o.stringify(a)));
					} catch (k) {
						throw Error("Malformed UTF-8 data");
					}
				},
				parse: function (a) {
					return o.parse(unescape(encodeURIComponent(a)));
				},
			}),
			j = (h.BufferedBlockAlgorithm = b.extend({
				reset: function () {
					this._data = new c.init();
					this._nDataBytes = 0;
				},
				_append: function (a) {
					"string" == typeof a && (a = x.parse(a));
					this._data.concat(a);
					this._nDataBytes += a.sigBytes;
				},
				_process: function (p) {
					var r = this._data,
						u = r.words,
						t = r.sigBytes,
						s = this.blockSize,
						n = t / (4 * s),
						n = p ? z.ceil(n) : z.max((n | 0) - this._minBufferSize, 0);
					p = n * s;
					t = z.min(4 * p, t);
					if (p) {
						for (var q = 0; q < p; q += s) {
							this._doProcessBlock(u, q);
						}
						q = u.splice(0, p);
						r.sigBytes -= t;
					}
					return new c.init(q, t);
				},
				clone: function () {
					var a = b.clone.call(this);
					a._data = this._data.clone();
					return a;
				},
				_minBufferSize: 0,
			}));
		h.Hasher = j.extend({
			cfg: b.extend(),
			init: function (a) {
				this.cfg = this.cfg.extend(a);
				this.reset();
			},
			reset: function () {
				j.reset.call(this);
				this._doReset();
			},
			update: function (a) {
				this._append(a);
				this._process();
				return this;
			},
			finalize: function (a) {
				a && this._append(a);
				return this._doFinalize();
			},
			blockSize: 16,
			_createHelper: function (a) {
				return function (k, l) {
					return new a.init(l).finalize(k);
				};
			},
			_createHmacHelper: function (a) {
				return function (k, l) {
					return new i.HMAC.init(a, l).finalize(k);
				};
			},
		});
		var i = (f.algo = {});
		return f;
	})(Math);
(function (o) {
	function d(r, s, p, u, q, t, n) {
		r = r + ((s & p) | (~s & u)) + q + n;
		return ((r << t) | (r >>> (32 - t))) + s;
	}
	function f(r, s, p, u, q, t, n) {
		r = r + ((s & u) | (p & ~u)) + q + n;
		return ((r << t) | (r >>> (32 - t))) + s;
	}
	function g(r, s, p, u, q, t, n) {
		r = r + (s ^ p ^ u) + q + n;
		return ((r << t) | (r >>> (32 - t))) + s;
	}
	function e(r, s, p, u, q, t, n) {
		r = r + (p ^ (s | ~u)) + q + n;
		return ((r << t) | (r >>> (32 - t))) + s;
	}
	for (
		var b = CryptoJS,
			c = b.lib,
			i = c.WordArray,
			k = c.Hasher,
			c = b.algo,
			h = [],
			j = 0;
		64 > j;
		j++
	) {
		h[j] = (4294967296 * o.abs(o.sin(j + 1))) | 0;
	}
	c = c.MD5 = k.extend({
		_doReset: function () {
			this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878]);
		},
		_doProcessBlock: function (Q, N) {
			for (var V = 0; 16 > V; V++) {
				var P = N + V,
					n = Q[P];
				Q[P] =
					(((n << 8) | (n >>> 24)) & 16711935) |
					(((n << 24) | (n >>> 8)) & 4278255360);
			}
			var V = this._hash.words,
				P = Q[N + 0],
				n = Q[N + 1],
				O = Q[N + 2],
				L = Q[N + 3],
				J = Q[N + 4],
				H = Q[N + 5],
				F = Q[N + 6],
				E = Q[N + 7],
				p = Q[N + 8],
				m = Q[N + 9],
				l = Q[N + 10],
				a = Q[N + 11],
				M = Q[N + 12],
				K = Q[N + 13],
				I = Q[N + 14],
				G = Q[N + 15],
				U = V[0],
				T = V[1],
				S = V[2],
				R = V[3],
				U = d(U, T, S, R, P, 7, h[0]),
				R = d(R, U, T, S, n, 12, h[1]),
				S = d(S, R, U, T, O, 17, h[2]),
				T = d(T, S, R, U, L, 22, h[3]),
				U = d(U, T, S, R, J, 7, h[4]),
				R = d(R, U, T, S, H, 12, h[5]),
				S = d(S, R, U, T, F, 17, h[6]),
				T = d(T, S, R, U, E, 22, h[7]),
				U = d(U, T, S, R, p, 7, h[8]),
				R = d(R, U, T, S, m, 12, h[9]),
				S = d(S, R, U, T, l, 17, h[10]),
				T = d(T, S, R, U, a, 22, h[11]),
				U = d(U, T, S, R, M, 7, h[12]),
				R = d(R, U, T, S, K, 12, h[13]),
				S = d(S, R, U, T, I, 17, h[14]),
				T = d(T, S, R, U, G, 22, h[15]),
				U = f(U, T, S, R, n, 5, h[16]),
				R = f(R, U, T, S, F, 9, h[17]),
				S = f(S, R, U, T, a, 14, h[18]),
				T = f(T, S, R, U, P, 20, h[19]),
				U = f(U, T, S, R, H, 5, h[20]),
				R = f(R, U, T, S, l, 9, h[21]),
				S = f(S, R, U, T, G, 14, h[22]),
				T = f(T, S, R, U, J, 20, h[23]),
				U = f(U, T, S, R, m, 5, h[24]),
				R = f(R, U, T, S, I, 9, h[25]),
				S = f(S, R, U, T, L, 14, h[26]),
				T = f(T, S, R, U, p, 20, h[27]),
				U = f(U, T, S, R, K, 5, h[28]),
				R = f(R, U, T, S, O, 9, h[29]),
				S = f(S, R, U, T, E, 14, h[30]),
				T = f(T, S, R, U, M, 20, h[31]),
				U = g(U, T, S, R, H, 4, h[32]),
				R = g(R, U, T, S, p, 11, h[33]),
				S = g(S, R, U, T, a, 16, h[34]),
				T = g(T, S, R, U, I, 23, h[35]),
				U = g(U, T, S, R, n, 4, h[36]),
				R = g(R, U, T, S, J, 11, h[37]),
				S = g(S, R, U, T, E, 16, h[38]),
				T = g(T, S, R, U, l, 23, h[39]),
				U = g(U, T, S, R, K, 4, h[40]),
				R = g(R, U, T, S, P, 11, h[41]),
				S = g(S, R, U, T, L, 16, h[42]),
				T = g(T, S, R, U, F, 23, h[43]),
				U = g(U, T, S, R, m, 4, h[44]),
				R = g(R, U, T, S, M, 11, h[45]),
				S = g(S, R, U, T, G, 16, h[46]),
				T = g(T, S, R, U, O, 23, h[47]),
				U = e(U, T, S, R, P, 6, h[48]),
				R = e(R, U, T, S, E, 10, h[49]),
				S = e(S, R, U, T, I, 15, h[50]),
				T = e(T, S, R, U, H, 21, h[51]),
				U = e(U, T, S, R, M, 6, h[52]),
				R = e(R, U, T, S, L, 10, h[53]),
				S = e(S, R, U, T, l, 15, h[54]),
				T = e(T, S, R, U, n, 21, h[55]),
				U = e(U, T, S, R, p, 6, h[56]),
				R = e(R, U, T, S, G, 10, h[57]),
				S = e(S, R, U, T, F, 15, h[58]),
				T = e(T, S, R, U, K, 21, h[59]),
				U = e(U, T, S, R, J, 6, h[60]),
				R = e(R, U, T, S, a, 10, h[61]),
				S = e(S, R, U, T, O, 15, h[62]),
				T = e(T, S, R, U, m, 21, h[63]);
			V[0] = (V[0] + U) | 0;
			V[1] = (V[1] + T) | 0;
			V[2] = (V[2] + S) | 0;
			V[3] = (V[3] + R) | 0;
		},
		_doFinalize: function () {
			var p = this._data,
				q = p.words,
				m = 8 * this._nDataBytes,
				r = 8 * p.sigBytes;
			q[r >>> 5] |= 128 << (24 - (r % 32));
			var n = o.floor(m / 4294967296);
			q[(((r + 64) >>> 9) << 4) + 15] =
				(((n << 8) | (n >>> 24)) & 16711935) |
				(((n << 24) | (n >>> 8)) & 4278255360);
			q[(((r + 64) >>> 9) << 4) + 14] =
				(((m << 8) | (m >>> 24)) & 16711935) |
				(((m << 24) | (m >>> 8)) & 4278255360);
			p.sigBytes = 4 * (q.length + 1);
			this._process();
			p = this._hash;
			q = p.words;
			for (m = 0; 4 > m; m++) {
				(r = q[m]),
					(q[m] =
						(((r << 8) | (r >>> 24)) & 16711935) |
						(((r << 24) | (r >>> 8)) & 4278255360));
			}
			return p;
		},
		clone: function () {
			var l = k.clone.call(this);
			l._hash = this._hash.clone();
			return l;
		},
	});
	b.MD5 = k._createHelper(c);
	b.HmacMD5 = k._createHmacHelper(c);
})(Math);
