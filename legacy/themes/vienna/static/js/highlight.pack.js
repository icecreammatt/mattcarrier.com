!(function (e) {
	'undefined' != typeof exports
		? e(exports)
		: ((window.hljs = e({})),
		  'function' == typeof define &&
				define.amd &&
				define([], function () {
					return window.hljs;
				}));
})(function (e) {
	function n(e) {
		return e.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
	}
	function t(e) {
		return e.nodeName.toLowerCase();
	}
	function r(e, n) {
		var t = e && e.exec(n);
		return t && 0 == t.index;
	}
	function a(e) {
		var n = (e.className + ' ' + (e.parentNode ? e.parentNode.className : '')).split(/\s+/);
		return (
			(n = n.map(function (e) {
				return e.replace(/^lang(uage)?-/, '');
			})),
			n.filter(function (e) {
				return N(e) || /no(-?)highlight/.test(e);
			})[0]
		);
	}
	function o(e, n) {
		var t = {};
		for (var r in e) t[r] = e[r];
		if (n) for (var r in n) t[r] = n[r];
		return t;
	}
	function i(e) {
		var n = [];
		return (
			(function r(e, a) {
				for (var o = e.firstChild; o; o = o.nextSibling)
					3 == o.nodeType
						? (a += o.nodeValue.length)
						: 1 == o.nodeType &&
						  (n.push({ event: 'start', offset: a, node: o }),
						  (a = r(o, a)),
						  t(o).match(/br|hr|img|input/) || n.push({ event: 'stop', offset: a, node: o }));
				return a;
			})(e, 0),
			n
		);
	}
	function c(e, r, a) {
		function o() {
			return e.length && r.length
				? e[0].offset != r[0].offset
					? e[0].offset < r[0].offset
						? e
						: r
					: 'start' == r[0].event
					? e
					: r
				: e.length
				? e
				: r;
		}
		function i(e) {
			function r(e) {
				return ' ' + e.nodeName + '="' + n(e.value) + '"';
			}
			l += '<' + t(e) + Array.prototype.map.call(e.attributes, r).join('') + '>';
		}
		function c(e) {
			l += '</' + t(e) + '>';
		}
		function u(e) {
			('start' == e.event ? i : c)(e.node);
		}
		for (var s = 0, l = '', f = []; e.length || r.length; ) {
			var g = o();
			if (((l += n(a.substr(s, g[0].offset - s))), (s = g[0].offset), g == e)) {
				f.reverse().forEach(c);
				do u(g.splice(0, 1)[0]), (g = o());
				while (g == e && g.length && g[0].offset == s);
				f.reverse().forEach(i);
			} else 'start' == g[0].event ? f.push(g[0].node) : f.pop(), u(g.splice(0, 1)[0]);
		}
		return l + n(a.substr(s));
	}
	function u(e) {
		function n(e) {
			return (e && e.source) || e;
		}
		function t(t, r) {
			return RegExp(n(t), 'm' + (e.cI ? 'i' : '') + (r ? 'g' : ''));
		}
		function r(a, i) {
			if (!a.compiled) {
				if (((a.compiled = !0), (a.k = a.k || a.bK), a.k)) {
					var c = {},
						u = function (n, t) {
							e.cI && (t = t.toLowerCase()),
								t.split(' ').forEach(function (e) {
									var t = e.split('|');
									c[t[0]] = [n, t[1] ? Number(t[1]) : 1];
								});
						};
					'string' == typeof a.k
						? u('keyword', a.k)
						: Object.keys(a.k).forEach(function (e) {
								u(e, a.k[e]);
						  }),
						(a.k = c);
				}
				(a.lR = t(a.l || /\b[A-Za-z0-9_]+\b/, !0)),
					i &&
						(a.bK && (a.b = '\\b(' + a.bK.split(' ').join('|') + ')\\b'),
						a.b || (a.b = /\B|\b/),
						(a.bR = t(a.b)),
						a.e || a.eW || (a.e = /\B|\b/),
						a.e && (a.eR = t(a.e)),
						(a.tE = n(a.e) || ''),
						a.eW && i.tE && (a.tE += (a.e ? '|' : '') + i.tE)),
					a.i && (a.iR = t(a.i)),
					void 0 === a.r && (a.r = 1),
					a.c || (a.c = []);
				var s = [];
				a.c.forEach(function (e) {
					e.v
						? e.v.forEach(function (n) {
								s.push(o(e, n));
						  })
						: s.push('self' == e ? a : e);
				}),
					(a.c = s),
					a.c.forEach(function (e) {
						r(e, a);
					}),
					a.starts && r(a.starts, i);
				var l = a.c
					.map(function (e) {
						return e.bK ? '\\.?(' + e.b + ')\\.?' : e.b;
					})
					.concat([a.tE, a.i])
					.map(n)
					.filter(Boolean);
				a.t = l.length
					? t(l.join('|'), !0)
					: {
							exec: function () {
								return null;
							}
					  };
			}
		}
		r(e);
	}
	function s(e, t, a, o) {
		function i(e, n) {
			for (var t = 0; t < n.c.length; t++) if (r(n.c[t].bR, e)) return n.c[t];
		}
		function c(e, n) {
			return r(e.eR, n) ? e : e.eW ? c(e.parent, n) : void 0;
		}
		function f(e, n) {
			return !a && r(n.iR, e);
		}
		function g(e, n) {
			var t = x.cI ? n[0].toLowerCase() : n[0];
			return e.k.hasOwnProperty(t) && e.k[t];
		}
		function p(e, n, t, r) {
			var a = r ? '' : E.classPrefix,
				o = '<span class="' + a,
				i = t ? '' : '</span>';
			return (o += e + '">'), o + n + i;
		}
		function d() {
			if (!w.k) return n(y);
			var e = '',
				t = 0;
			w.lR.lastIndex = 0;
			for (var r = w.lR.exec(y); r; ) {
				e += n(y.substr(t, r.index - t));
				var a = g(w, r);
				a ? ((B += a[1]), (e += p(a[0], n(r[0])))) : (e += n(r[0])),
					(t = w.lR.lastIndex),
					(r = w.lR.exec(y));
			}
			return e + n(y.substr(t));
		}
		function h() {
			if (w.sL && !R[w.sL]) return n(y);
			var e = w.sL ? s(w.sL, y, !0, L[w.sL]) : l(y);
			return (
				w.r > 0 && (B += e.r),
				'continuous' == w.subLanguageMode && (L[w.sL] = e.top),
				p(e.language, e.value, !1, !0)
			);
		}
		function v() {
			return void 0 !== w.sL ? h() : d();
		}
		function b(e, t) {
			var r = e.cN ? p(e.cN, '', !0) : '';
			e.rB ? ((M += r), (y = '')) : e.eB ? ((M += n(t) + r), (y = '')) : ((M += r), (y = t)),
				(w = Object.create(e, { parent: { value: w } }));
		}
		function m(e, t) {
			if (((y += e), void 0 === t)) return (M += v()), 0;
			var r = i(t, w);
			if (r) return (M += v()), b(r, t), r.rB ? 0 : t.length;
			var a = c(w, t);
			if (a) {
				var o = w;
				o.rE || o.eE || (y += t), (M += v());
				do w.cN && (M += '</span>'), (B += w.r), (w = w.parent);
				while (w != a.parent);
				return o.eE && (M += n(t)), (y = ''), a.starts && b(a.starts, ''), o.rE ? 0 : t.length;
			}
			if (f(t, w))
				throw new Error('Illegal lexeme "' + t + '" for mode "' + (w.cN || '<unnamed>') + '"');
			return (y += t), t.length || 1;
		}
		var x = N(e);
		if (!x) throw new Error('Unknown language: "' + e + '"');
		u(x);
		for (var w = o || x, L = {}, M = '', k = w; k != x; k = k.parent)
			k.cN && (M = p(k.cN, '', !0) + M);
		var y = '',
			B = 0;
		try {
			for (var C, j, I = 0; ; ) {
				if (((w.t.lastIndex = I), (C = w.t.exec(t)), !C)) break;
				(j = m(t.substr(I, C.index - I), C[0])), (I = C.index + j);
			}
			m(t.substr(I));
			for (var k = w; k.parent; k = k.parent) k.cN && (M += '</span>');
			return { r: B, value: M, language: e, top: w };
		} catch (A) {
			if (-1 != A.message.indexOf('Illegal')) return { r: 0, value: n(t) };
			throw A;
		}
	}
	function l(e, t) {
		t = t || E.languages || Object.keys(R);
		var r = { r: 0, value: n(e) },
			a = r;
		return (
			t.forEach(function (n) {
				if (N(n)) {
					var t = s(n, e, !1);
					(t.language = n), t.r > a.r && (a = t), t.r > r.r && ((a = r), (r = t));
				}
			}),
			a.language && (r.second_best = a),
			r
		);
	}
	function f(e) {
		return (
			E.tabReplace &&
				(e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) {
					return n.replace(/\t/g, E.tabReplace);
				})),
			E.useBR && (e = e.replace(/\n/g, '<br>')),
			e
		);
	}
	function g(e, n, t) {
		var r = n ? x[n] : t,
			a = [e.trim()];
		return e.match(/(\s|^)hljs(\s|$)/) || a.push('hljs'), r && a.push(r), a.join(' ').trim();
	}
	function p(e) {
		var n = a(e);
		if (!/no(-?)highlight/.test(n)) {
			var t;
			E.useBR
				? ((t = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')),
				  (t.innerHTML = e.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n')))
				: (t = e);
			var r = t.textContent,
				o = n ? s(n, r, !0) : l(r),
				u = i(t);
			if (u.length) {
				var p = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
				(p.innerHTML = o.value), (o.value = c(u, i(p), r));
			}
			(o.value = f(o.value)),
				(e.innerHTML = o.value),
				(e.className = g(e.className, n, o.language)),
				(e.result = { language: o.language, re: o.r }),
				o.second_best &&
					(e.second_best = { language: o.second_best.language, re: o.second_best.r });
		}
	}
	function d(e) {
		E = o(E, e);
	}
	function h() {
		if (!h.called) {
			h.called = !0;
			var e = document.querySelectorAll('pre code');
			Array.prototype.forEach.call(e, p);
		}
	}
	function v() {
		addEventListener('DOMContentLoaded', h, !1), addEventListener('load', h, !1);
	}
	function b(n, t) {
		var r = (R[n] = t(e));
		r.aliases &&
			r.aliases.forEach(function (e) {
				x[e] = n;
			});
	}
	function m() {
		return Object.keys(R);
	}
	function N(e) {
		return R[e] || R[x[e]];
	}
	var E = { classPrefix: 'hljs-', tabReplace: null, useBR: !1, languages: void 0 },
		R = {},
		x = {};
	return (
		(e.highlight = s),
		(e.highlightAuto = l),
		(e.fixMarkup = f),
		(e.highlightBlock = p),
		(e.configure = d),
		(e.initHighlighting = h),
		(e.initHighlightingOnLoad = v),
		(e.registerLanguage = b),
		(e.listLanguages = m),
		(e.getLanguage = N),
		(e.inherit = o),
		(e.IR = '[a-zA-Z][a-zA-Z0-9_]*'),
		(e.UIR = '[a-zA-Z_][a-zA-Z0-9_]*'),
		(e.NR = '\\b\\d+(\\.\\d+)?'),
		(e.CNR = '(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'),
		(e.BNR = '\\b(0b[01]+)'),
		(e.RSR =
			'!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~'),
		(e.BE = { b: '\\\\[\\s\\S]', r: 0 }),
		(e.ASM = { cN: 'string', b: "'", e: "'", i: '\\n', c: [e.BE] }),
		(e.QSM = { cN: 'string', b: '"', e: '"', i: '\\n', c: [e.BE] }),
		(e.PWM = {
			b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
		}),
		(e.CLCM = { cN: 'comment', b: '//', e: '$', c: [e.PWM] }),
		(e.CBCM = { cN: 'comment', b: '/\\*', e: '\\*/', c: [e.PWM] }),
		(e.HCM = { cN: 'comment', b: '#', e: '$', c: [e.PWM] }),
		(e.NM = { cN: 'number', b: e.NR, r: 0 }),
		(e.CNM = { cN: 'number', b: e.CNR, r: 0 }),
		(e.BNM = { cN: 'number', b: e.BNR, r: 0 }),
		(e.CSSNM = {
			cN: 'number',
			b:
				e.NR +
				'(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?',
			r: 0
		}),
		(e.RM = {
			cN: 'regexp',
			b: /\//,
			e: /\/[gimuy]*/,
			i: /\n/,
			c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }]
		}),
		(e.TM = { cN: 'title', b: e.IR, r: 0 }),
		(e.UTM = { cN: 'title', b: e.UIR, r: 0 }),
		e
	);
});
hljs.registerLanguage('cpp', function (t) {
	var i = {
		keyword:
			'false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginaryintmax_t uintmax_t int8_t uint8_t int16_t uint16_t int32_t uint32_t  int64_t uint64_tint_least8_t uint_least8_t int_least16_t uint_least16_t int_least32_t uint_least32_tint_least64_t uint_least64_t int_fast8_t uint_fast8_t int_fast16_t uint_fast16_t int_fast32_tuint_fast32_t int_fast64_t uint_fast64_t intptr_t uintptr_t atomic_bool atomic_char atomic_scharatomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llongatomic_ullong atomic_wchar_t atomic_char16_t atomic_char32_t atomic_intmax_t atomic_uintmax_tatomic_intptr_t atomic_uintptr_t atomic_size_t atomic_ptrdiff_t atomic_int_least8_t atomic_int_least16_tatomic_int_least32_t atomic_int_least64_t atomic_uint_least8_t atomic_uint_least16_t atomic_uint_least32_tatomic_uint_least64_t atomic_int_fast8_t atomic_int_fast16_t atomic_int_fast32_t atomic_int_fast64_tatomic_uint_fast8_t atomic_uint_fast16_t atomic_uint_fast32_t atomic_uint_fast64_t',
		built_in:
			'std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf'
	};
	return {
		aliases: ['c', 'h', 'c++', 'h++'],
		k: i,
		i: '</',
		c: [
			t.CLCM,
			t.CBCM,
			t.QSM,
			{ cN: 'string', b: "'\\\\?.", e: "'", i: '.' },
			{ cN: 'number', b: '\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)' },
			t.CNM,
			{
				cN: 'preprocessor',
				b: '#',
				e: '$',
				k: 'if else elif endif define undef warning error line pragma',
				c: [{ b: 'include\\s*[<"]', e: '[>"]', k: 'include', i: '\\n' }, t.CLCM]
			},
			{
				cN: 'stl_container',
				b: '\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<',
				e: '>',
				k: i,
				c: ['self']
			},
			{ b: t.IR + '::' },
			{ bK: 'new throw return', r: 0 },
			{
				cN: 'function',
				b: '(' + t.IR + '\\s+)+' + t.IR + '\\s*\\(',
				rB: !0,
				e: /[{;=]/,
				eE: !0,
				k: i,
				c: [
					{ b: t.IR + '\\s*\\(', rB: !0, c: [t.TM], r: 0 },
					{ cN: 'params', b: /\(/, e: /\)/, k: i, r: 0, c: [t.CBCM] },
					t.CLCM,
					t.CBCM
				]
			}
		]
	};
});
hljs.registerLanguage('ruby', function (e) {
	var b = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?',
		r =
			'and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor',
		c = { cN: 'yardoctag', b: '@[A-Za-z]+' },
		a = { cN: 'value', b: '#<', e: '>' },
		s = {
			cN: 'comment',
			v: [
				{ b: '#', e: '$', c: [c] },
				{ b: '^\\=begin', e: '^\\=end', c: [c], r: 10 },
				{ b: '^__END__', e: '\\n$' }
			]
		},
		n = { cN: 'subst', b: '#\\{', e: '}', k: r },
		t = {
			cN: 'string',
			c: [e.BE, n],
			v: [
				{ b: /'/, e: /'/ },
				{ b: /"/, e: /"/ },
				{ b: /`/, e: /`/ },
				{ b: '%[qQwWx]?\\(', e: '\\)' },
				{ b: '%[qQwWx]?\\[', e: '\\]' },
				{ b: '%[qQwWx]?{', e: '}' },
				{ b: '%[qQwWx]?<', e: '>' },
				{ b: '%[qQwWx]?/', e: '/' },
				{ b: '%[qQwWx]?%', e: '%' },
				{ b: '%[qQwWx]?-', e: '-' },
				{ b: '%[qQwWx]?\\|', e: '\\|' },
				{ b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/ }
			]
		},
		i = { cN: 'params', b: '\\(', e: '\\)', k: r },
		d = [
			t,
			a,
			s,
			{
				cN: 'class',
				bK: 'class module',
				e: '$|;',
				i: /=/,
				c: [
					e.inherit(e.TM, { b: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?' }),
					{ cN: 'inheritance', b: '<\\s*', c: [{ cN: 'parent', b: '(' + e.IR + '::)?' + e.IR }] },
					s
				]
			},
			{ cN: 'function', bK: 'def', e: ' |$|;', r: 0, c: [e.inherit(e.TM, { b: b }), i, s] },
			{ cN: 'constant', b: '(::)?(\\b[A-Z]\\w*(::)?)+', r: 0 },
			{ cN: 'symbol', b: e.UIR + '(\\!|\\?)?:', r: 0 },
			{ cN: 'symbol', b: ':', c: [t, { b: b }], r: 0 },
			{
				cN: 'number',
				b: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
				r: 0
			},
			{ cN: 'variable', b: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))' },
			{
				b: '(' + e.RSR + ')\\s*',
				c: [
					a,
					s,
					{
						cN: 'regexp',
						c: [e.BE, n],
						i: /\n/,
						v: [
							{ b: '/', e: '/[a-z]*' },
							{ b: '%r{', e: '}[a-z]*' },
							{ b: '%r\\(', e: '\\)[a-z]*' },
							{ b: '%r!', e: '![a-z]*' },
							{ b: '%r\\[', e: '\\][a-z]*' }
						]
					}
				],
				r: 0
			}
		];
	(n.c = d), (i.c = d);
	var l = '[>?]>',
		u = '[\\w#]+\\(\\w+\\):\\d+:\\d+>',
		N = '(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>',
		o = [
			{ b: /^\s*=>/, cN: 'status', starts: { e: '$', c: d } },
			{ cN: 'prompt', b: '^(' + l + '|' + u + '|' + N + ')', starts: { e: '$', c: d } }
		];
	return { aliases: ['rb', 'gemspec', 'podspec', 'thor', 'irb'], k: r, c: [s].concat(o).concat(d) };
});
hljs.registerLanguage('apache', function (e) {
	var r = { cN: 'number', b: '[\\$%]\\d+' };
	return {
		aliases: ['apacheconf'],
		cI: !0,
		c: [
			e.HCM,
			{ cN: 'tag', b: '</?', e: '>' },
			{
				cN: 'keyword',
				b: /\w+/,
				r: 0,
				k: {
					common:
						'order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername'
				},
				starts: {
					e: /$/,
					r: 0,
					k: { literal: 'on off all' },
					c: [
						{ cN: 'sqbracket', b: '\\s\\[', e: '\\]$' },
						{ cN: 'cbracket', b: '[\\$%]\\{', e: '\\}', c: ['self', r] },
						r,
						e.QSM
					]
				}
			}
		],
		i: /\S/
	};
});
hljs.registerLanguage('python', function (e) {
	var r = { cN: 'prompt', b: /^(>>>|\.\.\.) / },
		b = {
			cN: 'string',
			c: [e.BE],
			v: [
				{ b: /(u|b)?r?'''/, e: /'''/, c: [r], r: 10 },
				{ b: /(u|b)?r?"""/, e: /"""/, c: [r], r: 10 },
				{ b: /(u|r|ur)'/, e: /'/, r: 10 },
				{ b: /(u|r|ur)"/, e: /"/, r: 10 },
				{ b: /(b|br)'/, e: /'/ },
				{ b: /(b|br)"/, e: /"/ },
				e.ASM,
				e.QSM
			]
		},
		l = {
			cN: 'number',
			r: 0,
			v: [{ b: e.BNR + '[lLjJ]?' }, { b: '\\b(0o[0-7]+)[lLjJ]?' }, { b: e.CNR + '[lLjJ]?' }]
		},
		c = { cN: 'params', b: /\(/, e: /\)/, c: ['self', r, l, b] };
	return {
		aliases: ['py', 'gyp'],
		k: {
			keyword:
				'and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False',
			built_in: 'Ellipsis NotImplemented'
		},
		i: /(<\/|->|\?)/,
		c: [
			r,
			l,
			b,
			e.HCM,
			{
				v: [
					{ cN: 'function', bK: 'def', r: 10 },
					{ cN: 'class', bK: 'class' }
				],
				e: /:/,
				i: /[${=;\n]/,
				c: [e.UTM, c]
			},
			{ cN: 'decorator', b: /@/, e: /$/ },
			{ b: /\b(print|exec)\(/ }
		]
	};
});
hljs.registerLanguage('javascript', function (r) {
	return {
		aliases: ['js'],
		k: {
			keyword:
				'in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class',
			literal: 'true false null undefined NaN Infinity',
			built_in:
				'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document'
		},
		c: [
			{ cN: 'pi', r: 10, v: [{ b: /^\s*('|")use strict('|")/ }, { b: /^\s*('|")use asm('|")/ }] },
			r.ASM,
			r.QSM,
			r.CLCM,
			r.CBCM,
			r.CNM,
			{
				b: '(' + r.RSR + '|\\b(case|return|throw)\\b)\\s*',
				k: 'return throw case',
				c: [r.CLCM, r.CBCM, r.RM, { b: /</, e: />;/, r: 0, sL: 'xml' }],
				r: 0
			},
			{
				cN: 'function',
				bK: 'function',
				e: /\{/,
				eE: !0,
				c: [
					r.inherit(r.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }),
					{ cN: 'params', b: /\(/, e: /\)/, c: [r.CLCM, r.CBCM], i: /["'\(]/ }
				],
				i: /\[|%/
			},
			{ b: /\$[(.]/ },
			{ b: '\\.' + r.IR, r: 0 }
		]
	};
});
hljs.registerLanguage('coffeescript', function (e) {
	var c = {
			keyword:
				'in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not',
			literal: 'true false null undefined yes no on off',
			reserved:
				'case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf',
			built_in: 'npm require console print module global window document'
		},
		n = '[A-Za-z$_][0-9A-Za-z$_]*',
		t = { cN: 'subst', b: /#\{/, e: /}/, k: c },
		r = [
			e.BNM,
			e.inherit(e.CNM, { starts: { e: '(\\s*/)?', r: 0 } }),
			{
				cN: 'string',
				v: [
					{ b: /'''/, e: /'''/, c: [e.BE] },
					{ b: /'/, e: /'/, c: [e.BE] },
					{ b: /"""/, e: /"""/, c: [e.BE, t] },
					{ b: /"/, e: /"/, c: [e.BE, t] }
				]
			},
			{
				cN: 'regexp',
				v: [
					{ b: '///', e: '///', c: [t, e.HCM] },
					{ b: '//[gim]*', r: 0 },
					{ b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/ }
				]
			},
			{ cN: 'property', b: '@' + n },
			{ b: '`', e: '`', eB: !0, eE: !0, sL: 'javascript' }
		];
	t.c = r;
	var i = e.inherit(e.TM, { b: n }),
		s = '(\\(.*\\))?\\s*\\B[-=]>',
		o = {
			cN: 'params',
			b: '\\([^\\(]',
			rB: !0,
			c: [{ b: /\(/, e: /\)/, k: c, c: ['self'].concat(r) }]
		};
	return {
		aliases: ['coffee', 'cson', 'iced'],
		k: c,
		i: /\/\*/,
		c: r.concat([
			{ cN: 'comment', b: '###', e: '###', c: [e.PWM] },
			e.HCM,
			{ cN: 'function', b: '^\\s*' + n + '\\s*=\\s*' + s, e: '[-=]>', rB: !0, c: [i, o] },
			{ b: /[:\(,=]\s*/, r: 0, c: [{ cN: 'function', b: s, e: '[-=]>', rB: !0, c: [o] }] },
			{
				cN: 'class',
				bK: 'class',
				e: '$',
				i: /[:="\[\]]/,
				c: [{ bK: 'extends', eW: !0, i: /[:="\[\]]/, c: [i] }, i]
			},
			{ cN: 'attribute', b: n + ':', e: ':', rB: !0, rE: !0, r: 0 }
		])
	};
});
hljs.registerLanguage('http', function () {
	return {
		i: '\\S',
		c: [
			{ cN: 'status', b: '^HTTP/[0-9\\.]+', e: '$', c: [{ cN: 'number', b: '\\b\\d{3}\\b' }] },
			{
				cN: 'request',
				b: '^[A-Z]+ (.*?) HTTP/[0-9\\.]+$',
				rB: !0,
				e: '$',
				c: [{ cN: 'string', b: ' ', e: ' ', eB: !0, eE: !0 }]
			},
			{
				cN: 'attribute',
				b: '^\\w',
				e: ': ',
				eE: !0,
				i: '\\n|\\s|=',
				starts: { cN: 'string', e: '$' }
			},
			{ b: '\\n\\n', starts: { sL: '', eW: !0 } }
		]
	};
});
hljs.registerLanguage('haskell', function (e) {
	var i = {
			cN: 'comment',
			v: [
				{ b: '--', e: '$' },
				{ b: '{-', e: '-}', c: ['self'] }
			]
		},
		c = { cN: 'pragma', b: '{-#', e: '#-}' },
		a = { cN: 'preprocessor', b: '^#', e: '$' },
		n = { cN: 'type', b: "\\b[A-Z][\\w']*", r: 0 },
		l = {
			cN: 'container',
			b: '\\(',
			e: '\\)',
			i: '"',
			c: [
				c,
				i,
				a,
				{ cN: 'type', b: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?' },
				e.inherit(e.TM, { b: "[_a-z][\\w']*" })
			]
		},
		t = { cN: 'container', b: '{', e: '}', c: l.c };
	return {
		aliases: ['hs'],
		k: 'let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec',
		c: [
			{ cN: 'module', b: '\\bmodule\\b', e: 'where', k: 'module where', c: [l, i], i: '\\W\\.|;' },
			{
				cN: 'import',
				b: '\\bimport\\b',
				e: '$',
				k: 'import|0 qualified as hiding',
				c: [l, i],
				i: '\\W\\.|;'
			},
			{
				cN: 'class',
				b: '^(\\s*)?(class|instance)\\b',
				e: 'where',
				k: 'class family instance where',
				c: [n, l, i]
			},
			{
				cN: 'typedef',
				b: '\\b(data|(new)?type)\\b',
				e: '$',
				k: 'data family type newtype deriving',
				c: [c, i, n, l, t]
			},
			{ cN: 'default', bK: 'default', e: '$', c: [n, l, i] },
			{ cN: 'infix', bK: 'infix infixl infixr', e: '$', c: [e.CNM, i] },
			{
				cN: 'foreign',
				b: '\\bforeign\\b',
				e: '$',
				k: 'foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe',
				c: [n, e.QSM, i]
			},
			{ cN: 'shebang', b: '#!\\/usr\\/bin\\/env runhaskell', e: '$' },
			c,
			i,
			a,
			e.QSM,
			e.CNM,
			n,
			e.inherit(e.TM, { b: "^[_a-z][\\w']*" }),
			{ b: '->|<-' }
		]
	};
});
hljs.registerLanguage('tex', function () {
	var c = { cN: 'command', b: '\\\\[a-zA-Zа-яА-я]+[\\*]?' },
		e = { cN: 'command', b: '\\\\[^a-zA-Zа-яА-я0-9]' },
		m = { cN: 'special', b: '[{}\\[\\]\\&#~]', r: 0 };
	return {
		c: [
			{
				b: '\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?',
				rB: !0,
				c: [
					c,
					e,
					{ cN: 'number', b: ' *=', e: '-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?', eB: !0 }
				],
				r: 10
			},
			c,
			e,
			m,
			{ cN: 'formula', b: '\\$\\$', e: '\\$\\$', c: [c, e, m], r: 0 },
			{ cN: 'formula', b: '\\$', e: '\\$', c: [c, e, m], r: 0 },
			{ cN: 'comment', b: '%', e: '$', r: 0 }
		]
	};
});
hljs.registerLanguage('css', function (e) {
	var c = '[a-zA-Z-][a-zA-Z0-9_-]*',
		a = { cN: 'function', b: c + '\\(', rB: !0, eE: !0, e: '\\(' };
	return {
		cI: !0,
		i: "[=/|']",
		c: [
			e.CBCM,
			{ cN: 'id', b: '\\#[A-Za-z0-9_-]+' },
			{ cN: 'class', b: '\\.[A-Za-z0-9_-]+', r: 0 },
			{ cN: 'attr_selector', b: '\\[', e: '\\]', i: '$' },
			{ cN: 'pseudo', b: ':(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\"\\\']+' },
			{ cN: 'at_rule', b: '@(font-face|page)', l: '[a-z-]+', k: 'font-face page' },
			{
				cN: 'at_rule',
				b: '@',
				e: '[{;]',
				c: [
					{ cN: 'keyword', b: /\S+/ },
					{ b: /\s/, eW: !0, eE: !0, r: 0, c: [a, e.ASM, e.QSM, e.CSSNM] }
				]
			},
			{ cN: 'tag', b: c, r: 0 },
			{
				cN: 'rules',
				b: '{',
				e: '}',
				i: '[^\\s]',
				r: 0,
				c: [
					e.CBCM,
					{
						cN: 'rule',
						b: '[^\\s]',
						rB: !0,
						e: ';',
						eW: !0,
						c: [
							{
								cN: 'attribute',
								b: '[A-Z\\_\\.\\-]+',
								e: ':',
								eE: !0,
								i: '[^\\s]',
								starts: {
									cN: 'value',
									eW: !0,
									eE: !0,
									c: [
										a,
										e.CSSNM,
										e.QSM,
										e.ASM,
										e.CBCM,
										{ cN: 'hexcolor', b: '#[0-9A-Fa-f]+' },
										{ cN: 'important', b: '!important' }
									]
								}
							}
						]
					}
				]
			}
		]
	};
});
hljs.registerLanguage('objectivec', function (e) {
	var t = {
			keyword:
				'int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required',
			literal: 'false true FALSE TRUE nil YES NO NULL',
			built_in:
				'NSString NSData NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView NSView NSViewController NSWindow NSWindowController NSSet NSUUID NSIndexSet UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection NSURLSession NSURLSessionDataTask NSURLSessionDownloadTask NSURLSessionUploadTask NSURLResponseUIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once'
		},
		o = /[a-zA-Z@][a-zA-Z0-9_]*/,
		a = '@interface @class @protocol @implementation';
	return {
		aliases: ['m', 'mm', 'objc', 'obj-c'],
		k: t,
		l: o,
		i: '</',
		c: [
			e.CLCM,
			e.CBCM,
			e.CNM,
			e.QSM,
			{
				cN: 'string',
				v: [
					{ b: '@"', e: '"', i: '\\n', c: [e.BE] },
					{ b: "'", e: "[^\\\\]'", i: "[^\\\\][^']" }
				]
			},
			{
				cN: 'preprocessor',
				b: '#',
				e: '$',
				c: [
					{
						cN: 'title',
						v: [
							{ b: '"', e: '"' },
							{ b: '<', e: '>' }
						]
					}
				]
			},
			{
				cN: 'class',
				b: '(' + a.split(' ').join('|') + ')\\b',
				e: '({|$)',
				eE: !0,
				k: a,
				l: o,
				c: [e.UTM]
			},
			{ cN: 'variable', b: '\\.' + e.UIR, r: 0 }
		]
	};
});
hljs.registerLanguage('swift', function (e) {
	var t = {
			keyword:
				'class deinit enum extension func import init let protocol static struct subscript typealias var break case continue default do else fallthrough if in for return switch where while as dynamicType is new super self Self Type __COLUMN__ __FILE__ __FUNCTION__ __LINE__ associativity didSet get infix inout left mutating none nonmutating operator override postfix precedence prefix right set unowned unowned safe unsafe weak willSet',
			literal: 'true false nil',
			built_in:
				'abs advance alignof alignofValue assert bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal false filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced join lexicographicalCompare map max maxElement min minElement nil numericCast partition posix print println quickSort reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith strideof strideofValue swap swift toString transcode true underestimateCount unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafePointers withVaList'
		},
		i = { cN: 'type', b: "\\b[A-Z][\\w']*", r: 0 },
		n = { cN: 'comment', b: '/\\*', e: '\\*/', c: [e.PWM, 'self'] },
		r = { cN: 'subst', b: /\\\(/, e: '\\)', k: t, c: [] },
		s = {
			cN: 'number',
			b: '\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b',
			r: 0
		},
		o = e.inherit(e.QSM, { c: [r, e.BE] });
	return (
		(r.c = [s]),
		{
			k: t,
			c: [
				o,
				e.CLCM,
				n,
				i,
				s,
				{
					cN: 'func',
					bK: 'func',
					e: '{',
					eE: !0,
					c: [
						e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/, i: /\(/ }),
						{ cN: 'generics', b: /\</, e: /\>/, i: /\>/ },
						{
							cN: 'params',
							b: /\(/,
							e: /\)/,
							k: t,
							c: ['self', s, o, e.CBCM, { b: ':' }],
							i: /["']/
						}
					],
					i: /\[|%/
				},
				{
					cN: 'class',
					k: 'struct protocol class extension enum',
					b: '(struct|protocol|class(?! (func|var))|extension|enum)',
					e: '\\{',
					eE: !0,
					c: [e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ })]
				},
				{
					cN: 'preprocessor',
					b: '(@assignment|@class_protocol|@exported|@final|@lazy|@noreturn|@NSCopying|@NSManaged|@objc|@optional|@required|@auto_closure|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix)'
				}
			]
		}
	);
});
hljs.registerLanguage('bash', function (e) {
	var t = { cN: 'variable', v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)\}/ }] },
		s = {
			cN: 'string',
			b: /"/,
			e: /"/,
			c: [e.BE, t, { cN: 'variable', b: /\$\(/, e: /\)/, c: [e.BE] }]
		},
		a = { cN: 'string', b: /'/, e: /'/ };
	return {
		aliases: ['sh', 'zsh'],
		l: /-?[a-z\.]+/,
		k: {
			keyword: 'if then else elif fi for while in do done case esac function',
			literal: 'true false',
			built_in:
				'break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp',
			operator: '-ne -eq -lt -gt -f -d -e -s -l -a'
		},
		c: [
			{ cN: 'shebang', b: /^#![^\n]+sh\s*$/, r: 10 },
			{
				cN: 'function',
				b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
				rB: !0,
				c: [e.inherit(e.TM, { b: /\w[\w\d_]*/ })],
				r: 0
			},
			e.HCM,
			e.NM,
			s,
			a,
			t
		]
	};
});
hljs.registerLanguage('markdown', function () {
	return {
		aliases: ['md', 'mkdown', 'mkd'],
		c: [
			{ cN: 'header', v: [{ b: '^#{1,6}', e: '$' }, { b: '^.+?\\n[=-]{2,}$' }] },
			{ b: '<', e: '>', sL: 'xml', r: 0 },
			{ cN: 'bullet', b: '^([*+-]|(\\d+\\.))\\s+' },
			{ cN: 'strong', b: '[*_]{2}.+?[*_]{2}' },
			{ cN: 'emphasis', v: [{ b: '\\*.+?\\*' }, { b: '_.+?_', r: 0 }] },
			{ cN: 'blockquote', b: '^>\\s+', e: '$' },
			{ cN: 'code', v: [{ b: '`.+?`' }, { b: '^( {4}|	)', e: '$', r: 0 }] },
			{ cN: 'horizontal_rule', b: '^[-\\*]{3,}', e: '$' },
			{
				b: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
				rB: !0,
				c: [
					{ cN: 'link_label', b: '\\[', e: '\\]', eB: !0, rE: !0, r: 0 },
					{ cN: 'link_url', b: '\\]\\(', e: '\\)', eB: !0, eE: !0 },
					{ cN: 'link_reference', b: '\\]\\[', e: '\\]', eB: !0, eE: !0 }
				],
				r: 10
			},
			{
				b: '^\\[.+\\]:',
				rB: !0,
				c: [
					{
						cN: 'link_reference',
						b: '\\[',
						e: '\\]:',
						eB: !0,
						eE: !0,
						starts: { cN: 'link_url', e: '$' }
					}
				]
			}
		]
	};
});
hljs.registerLanguage('diff', function () {
	return {
		aliases: ['patch'],
		c: [
			{
				cN: 'chunk',
				r: 10,
				v: [
					{ b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/ },
					{ b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
					{ b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }
				]
			},
			{
				cN: 'header',
				v: [
					{ b: /Index: /, e: /$/ },
					{ b: /=====/, e: /=====$/ },
					{ b: /^\-\-\-/, e: /$/ },
					{ b: /^\*{3} /, e: /$/ },
					{ b: /^\+\+\+/, e: /$/ },
					{ b: /\*{5}/, e: /\*{5}$/ }
				]
			},
			{ cN: 'addition', b: '^\\+', e: '$' },
			{ cN: 'deletion', b: '^\\-', e: '$' },
			{ cN: 'change', b: '^\\!', e: '$' }
		]
	};
});
hljs.registerLanguage('perl', function (e) {
	var t =
			'getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when',
		r = { cN: 'subst', b: '[$@]\\{', e: '\\}', k: t },
		s = { b: '->{', e: '}' },
		n = {
			cN: 'variable',
			v: [
				{ b: /\$\d/ },
				{ b: /[\$\%\@](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/ },
				{ b: /[\$\%\@][^\s\w{]/, r: 0 }
			]
		},
		o = { cN: 'comment', b: '^(__END__|__DATA__)', e: '\\n$', r: 5 },
		i = [e.BE, r, n],
		c = [
			n,
			e.HCM,
			o,
			{ cN: 'comment', b: '^\\=\\w', e: '\\=cut', eW: !0 },
			s,
			{
				cN: 'string',
				c: i,
				v: [
					{ b: 'q[qwxr]?\\s*\\(', e: '\\)', r: 5 },
					{ b: 'q[qwxr]?\\s*\\[', e: '\\]', r: 5 },
					{ b: 'q[qwxr]?\\s*\\{', e: '\\}', r: 5 },
					{ b: 'q[qwxr]?\\s*\\|', e: '\\|', r: 5 },
					{ b: 'q[qwxr]?\\s*\\<', e: '\\>', r: 5 },
					{ b: 'qw\\s+q', e: 'q', r: 5 },
					{ b: "'", e: "'", c: [e.BE] },
					{ b: '"', e: '"' },
					{ b: '`', e: '`', c: [e.BE] },
					{ b: '{\\w+}', c: [], r: 0 },
					{ b: '-?\\w+\\s*\\=\\>', c: [], r: 0 }
				]
			},
			{
				cN: 'number',
				b: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
				r: 0
			},
			{
				b: '(\\/\\/|' + e.RSR + '|\\b(split|return|print|reverse|grep)\\b)\\s*',
				k: 'split return print reverse grep',
				r: 0,
				c: [
					e.HCM,
					o,
					{ cN: 'regexp', b: '(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*', r: 10 },
					{ cN: 'regexp', b: '(m|qr)?/', e: '/[a-z]*', c: [e.BE], r: 0 }
				]
			},
			{ cN: 'sub', bK: 'sub', e: '(\\s*\\(.*?\\))?[;{]', r: 5 },
			{ cN: 'operator', b: '-\\w\\b', r: 0 }
		];
	return (r.c = c), (s.c = c), { aliases: ['pl'], k: t, c: c };
});
hljs.registerLanguage('vim', function (e) {
	return {
		l: /[!#@\w]+/,
		k: {
			keyword:
				'N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope cp cpf cq cr cs cst cu cuna cunme cw d|0 delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu g|0 go gr grepa gu gv ha h|0 helpf helpg helpt hi hid his i|0 ia iabc if ij il im imapc ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs n|0 new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf q|0 quita qa r|0 rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv s|0 sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync t|0 tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up v|0 ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank',
			built_in:
				'abs acos add and append argc argidx argv asin atan atan2 browse browsedir bufexists buflisted bufloaded bufname bufnr bufwinnr byte2line byteidx call ceil changenr char2nr cindent clearmatches col complete complete_add complete_check confirm copy cos cosh count cscope_connection cursor deepcopy delete did_filetype diff_filler diff_hlID empty escape eval eventhandler executable exists exp expand extend feedkeys filereadable filewritable filter finddir findfile float2nr floor fmod fnameescape fnamemodify foldclosed foldclosedend foldlevel foldtext foldtextresult foreground function garbagecollect get getbufline getbufvar getchar getcharmod getcmdline getcmdpos getcmdtype getcwd getfontname getfperm getfsize getftime getftype getline getloclist getmatches getpid getpos getqflist getreg getregtype gettabvar gettabwinvar getwinposx getwinposy getwinvar glob globpath has has_key haslocaldir hasmapto histadd histdel histget histnr hlexists hlID hostname iconv indent index input inputdialog inputlist inputrestore inputsave inputsecret insert invert isdirectory islocked items join keys len libcall libcallnr line line2byte lispindent localtime log log10 luaeval map maparg mapcheck match matchadd matcharg matchdelete matchend matchlist matchstr max min mkdir mode mzeval nextnonblank nr2char or pathshorten pow prevnonblank printf pumvisible py3eval pyeval range readfile reltime reltimestr remote_expr remote_foreground remote_peek remote_read remote_send remove rename repeat resolve reverse round screenattr screenchar screencol screenrow search searchdecl searchpair searchpairpos searchpos server2client serverlist setbufvar setcmdpos setline setloclist setmatches setpos setqflist setreg settabvar settabwinvar setwinvar sha256 shellescape shiftwidth simplify sin sinh sort soundfold spellbadword spellsuggest split sqrt str2float str2nr strchars strdisplaywidth strftime stridx string strlen strpart strridx strtrans strwidth submatch substitute synconcealed synID synIDattr synIDtrans synstack system tabpagebuflist tabpagenr tabpagewinnr tagfiles taglist tan tanh tempname tolower toupper tr trunc type undofile undotree values virtcol visualmode wildmenumode winbufnr wincol winheight winline winnr winrestcmd winrestview winsaveview winwidth writefile xor'
		},
		i: /[{:]/,
		c: [
			e.NM,
			e.ASM,
			{ cN: 'string', b: /"((\\")|[^"\n])*("|\n)/ },
			{ cN: 'variable', b: /[bwtglsav]:[\w\d_]*/ },
			{
				cN: 'function',
				bK: 'function function!',
				e: '$',
				r: 0,
				c: [e.TM, { cN: 'params', b: '\\(', e: '\\)' }]
			}
		]
	};
});
hljs.registerLanguage('makefile', function (e) {
	var a = { cN: 'variable', b: /\$\(/, e: /\)/, c: [e.BE] };
	return {
		aliases: ['mk', 'mak'],
		c: [
			e.HCM,
			{
				b: /^\w+\s*\W*=/,
				rB: !0,
				r: 0,
				starts: { cN: 'constant', e: /\s*\W*=/, eE: !0, starts: { e: /$/, r: 0, c: [a] } }
			},
			{ cN: 'title', b: /^[\w]+:\s*$/ },
			{ cN: 'phony', b: /^\.PHONY:/, e: /$/, k: '.PHONY', l: /[\.\w]+/ },
			{ b: /^\t+/, e: /$/, r: 0, c: [e.QSM, a] }
		]
	};
});
hljs.registerLanguage('cs', function (e) {
	var r =
			'abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield',
		t = e.IR + '(<' + e.IR + '>)?';
	return {
		aliases: ['csharp'],
		k: r,
		i: /::/,
		c: [
			{
				cN: 'comment',
				b: '///',
				e: '$',
				rB: !0,
				c: [{ cN: 'xmlDocTag', v: [{ b: '///', r: 0 }, { b: '<!--|-->' }, { b: '</?', e: '>' }] }]
			},
			e.CLCM,
			e.CBCM,
			{
				cN: 'preprocessor',
				b: '#',
				e: '$',
				k: 'if else elif endif define undef warning error line region endregion pragma checksum'
			},
			{ cN: 'string', b: '@"', e: '"', c: [{ b: '""' }] },
			e.ASM,
			e.QSM,
			e.CNM,
			{ bK: 'class namespace interface', e: /[{;=]/, i: /[^\s:]/, c: [e.TM, e.CLCM, e.CBCM] },
			{ bK: 'new return throw await', r: 0 },
			{
				cN: 'function',
				b: '(' + t + '\\s+)+' + e.IR + '\\s*\\(',
				rB: !0,
				e: /[{;=]/,
				eE: !0,
				k: r,
				c: [
					{ b: e.IR + '\\s*\\(', rB: !0, c: [e.TM], r: 0 },
					{ cN: 'params', b: /\(/, e: /\)/, k: r, r: 0, c: [e.ASM, e.QSM, e.CNM, e.CBCM] },
					e.CLCM,
					e.CBCM
				]
			}
		]
	};
});
hljs.registerLanguage('json', function (e) {
	var t = { literal: 'true false null' },
		i = [e.QSM, e.CNM],
		l = { cN: 'value', e: ',', eW: !0, eE: !0, c: i, k: t },
		c = {
			b: '{',
			e: '}',
			c: [
				{
					cN: 'attribute',
					b: '\\s*"',
					e: '"\\s*:\\s*',
					eB: !0,
					eE: !0,
					c: [e.BE],
					i: '\\n',
					starts: l
				}
			],
			i: '\\S'
		},
		n = { b: '\\[', e: '\\]', c: [e.inherit(l, { cN: null })], i: '\\S' };
	return i.splice(i.length, 0, c, n), { c: i, k: t, i: '\\S' };
});
hljs.registerLanguage('go', function (e) {
	var t = {
		keyword:
			'break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer',
		constant: 'true false iota nil',
		typename:
			'bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune',
		built_in:
			'append cap close complex copy imag len make new panic print println real recover delete'
	};
	return {
		aliases: ['golang'],
		k: t,
		i: '</',
		c: [
			e.CLCM,
			e.CBCM,
			e.QSM,
			{ cN: 'string', b: "'", e: "[^\\\\]'" },
			{ cN: 'string', b: '`', e: '`' },
			{ cN: 'number', b: e.CNR + '[dflsi]?', r: 0 },
			e.CNM
		]
	};
});
hljs.registerLanguage('nginx', function (e) {
	var r = { cN: 'variable', v: [{ b: /\$\d+/ }, { b: /\$\{/, e: /}/ }, { b: '[\\$\\@]' + e.UIR }] },
		b = {
			eW: !0,
			l: '[a-z/_]+',
			k: {
				built_in:
					'on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll'
			},
			r: 0,
			i: '=>',
			c: [
				e.HCM,
				{
					cN: 'string',
					c: [e.BE, r],
					v: [
						{ b: /"/, e: /"/ },
						{ b: /'/, e: /'/ }
					]
				},
				{ cN: 'url', b: '([a-z]+):/', e: '\\s', eW: !0, eE: !0, c: [r] },
				{
					cN: 'regexp',
					c: [e.BE, r],
					v: [
						{ b: '\\s\\^', e: '\\s|{|;', rE: !0 },
						{ b: '~\\*?\\s+', e: '\\s|{|;', rE: !0 },
						{ b: '\\*(\\.[a-z\\-]+)+' },
						{ b: '([a-z\\-]+\\.)+\\*' }
					]
				},
				{ cN: 'number', b: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b' },
				{ cN: 'number', b: '\\b\\d+[kKmMgGdshdwy]*\\b', r: 0 },
				r
			]
		};
	return {
		aliases: ['nginxconf'],
		c: [
			e.HCM,
			{ b: e.UIR + '\\s', e: ';|{', rB: !0, c: [{ cN: 'title', b: e.UIR, starts: b }], r: 0 }
		],
		i: '[^\\s\\}]'
	};
});
hljs.registerLanguage('sql', function (e) {
	var t = { cN: 'comment', b: '--', e: '$' };
	return {
		cI: !0,
		i: /[<>]/,
		c: [
			{
				cN: 'operator',
				bK: 'begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup',
				e: /;/,
				eW: !0,
				k: {
					keyword:
						'abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon',
					literal: 'true false null',
					built_in:
						'array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text'
				},
				c: [
					{ cN: 'string', b: "'", e: "'", c: [e.BE, { b: "''" }] },
					{ cN: 'string', b: '"', e: '"', c: [e.BE, { b: '""' }] },
					{ cN: 'string', b: '`', e: '`', c: [e.BE] },
					e.CNM,
					e.CBCM,
					t
				]
			},
			e.CBCM,
			t
		]
	};
});
hljs.registerLanguage('xml', function () {
	var t = '[A-Za-z0-9\\._:-]+',
		e = { b: /<\?(php)?(?!\w)/, e: /\?>/, sL: 'php', subLanguageMode: 'continuous' },
		c = {
			eW: !0,
			i: /</,
			r: 0,
			c: [
				e,
				{ cN: 'attribute', b: t, r: 0 },
				{
					b: '=',
					r: 0,
					c: [
						{ cN: 'value', c: [e], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s\/>]+/ }] }
					]
				}
			]
		};
	return {
		aliases: ['html', 'xhtml', 'rss', 'atom', 'xsl', 'plist'],
		cI: !0,
		c: [
			{ cN: 'doctype', b: '<!DOCTYPE', e: '>', r: 10, c: [{ b: '\\[', e: '\\]' }] },
			{ cN: 'comment', b: '<!--', e: '-->', r: 10 },
			{ cN: 'cdata', b: '<\\!\\[CDATA\\[', e: '\\]\\]>', r: 10 },
			{
				cN: 'tag',
				b: '<style(?=\\s|>|$)',
				e: '>',
				k: { title: 'style' },
				c: [c],
				starts: { e: '</style>', rE: !0, sL: 'css' }
			},
			{
				cN: 'tag',
				b: '<script(?=\\s|>|$)',
				e: '>',
				k: { title: 'script' },
				c: [c],
				starts: { e: '</script>', rE: !0, sL: 'javascript' }
			},
			e,
			{ cN: 'pi', b: /<\?\w+/, e: /\?>/, r: 10 },
			{ cN: 'tag', b: '</?', e: '/?>', c: [{ cN: 'title', b: /[^ \/><\n\t]+/, r: 0 }, c] }
		]
	};
});
hljs.registerLanguage('x86asm', function (s) {
	return {
		cI: !0,
		l: '\\.?' + s.IR,
		k: {
			keyword:
				'lock rep repe repz repne repnz xaquire xrelease bnd nobnd aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg cmpxchg486 cmpxchg8b cmpxchg16b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip fucomp fucompp fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc incbin insb insd insw int int01 int1 int03 int3 into invd invpcid invlpg invlpga iret iretd iretq iretw jcxz jecxz jrcxz jmp jmpe lahf lar lds lea leave les lfence lfs lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne loopnz loopz lsl lss ltr mfence monitor mov movd movq movsb movsd movsq movsw movsx movsxd movzx mul mwait neg nop not or out outsb outsd outsw packssdw packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdshr rdmsr rdpmc rdtsc rdtscp ret retf retn rol ror rdm rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd scasq scasw sfence sgdt shl shld shr shrd sidt sldt skinit smi smint smintold smsw stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter sysexit sysret test ud0 ud1 ud2b ud2 ud2a umov verr verw fwait wbinvd wrshr wrmsr xadd xbts xchg xlatb xlat xor cmove cmovz cmovne cmovnz cmova cmovnbe cmovae cmovnb cmovb cmovnae cmovbe cmovna cmovg cmovnle cmovge cmovnl cmovl cmovnge cmovle cmovng cmovc cmovnc cmovo cmovno cmovs cmovns cmovp cmovpe cmovnp cmovpo je jz jne jnz ja jnbe jae jnb jb jnae jbe jna jg jnle jge jnl jl jnge jle jng jc jnc jo jno js jns jpo jnp jpe jp sete setz setne setnz seta setnbe setae setnb setnc setb setnae setcset setbe setna setg setnle setge setnl setl setnge setle setng sets setns seto setno setpe setp setpo setnp addps addss andnps andps cmpeqps cmpeqss cmpleps cmpless cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmpunordps cmpunordss cmpps cmpss comiss cvtpi2ps cvtps2pi cvtsi2ss cvtss2si cvttps2pi cvttss2si divps divss ldmxcsr maxps maxss minps minss movaps movhps movlhps movlps movhlps movmskps movntps movss movups mulps mulss orps rcpps rcpss rsqrtps rsqrtss shufps sqrtps sqrtss stmxcsr subps subss ucomiss unpckhps unpcklps xorps fxrstor fxrstor64 fxsave fxsave64 xgetbv xsetbv xsave xsave64 xsaveopt xsaveopt64 xrstor xrstor64 prefetchnta prefetcht0 prefetcht1 prefetcht2 maskmovq movntq pavgb pavgw pextrw pinsrw pmaxsw pmaxub pminsw pminub pmovmskb pmulhuw psadbw pshufw pf2iw pfnacc pfpnacc pi2fw pswapd maskmovdqu clflush movntdq movnti movntpd movdqa movdqu movdq2q movq2dq paddq pmuludq pshufd pshufhw pshuflw pslldq psrldq psubq punpckhqdq punpcklqdq addpd addsd andnpd andpd cmpeqpd cmpeqsd cmplepd cmplesd cmpltpd cmpltsd cmpneqpd cmpneqsd cmpnlepd cmpnlesd cmpnltpd cmpnltsd cmpordpd cmpordsd cmpunordpd cmpunordsd cmppd comisd cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtps2dq cvtps2pd cvtsd2si cvtsd2ss cvtsi2sd cvtss2sd cvttpd2pi cvttpd2dq cvttps2dq cvttsd2si divpd divsd maxpd maxsd minpd minsd movapd movhpd movlpd movmskpd movupd mulpd mulsd orpd shufpd sqrtpd sqrtsd subpd subsd ucomisd unpckhpd unpcklpd xorpd addsubpd addsubps haddpd haddps hsubpd hsubps lddqu movddup movshdup movsldup clgi stgi vmcall vmclear vmfunc vmlaunch vmload vmmcall vmptrld vmptrst vmread vmresume vmrun vmsave vmwrite vmxoff vmxon invept invvpid pabsb pabsw pabsd palignr phaddw phaddd phaddsw phsubw phsubd phsubsw pmaddubsw pmulhrsw pshufb psignb psignw psignd extrq insertq movntsd movntss lzcnt blendpd blendps blendvpd blendvps dppd dpps extractps insertps movntdqa mpsadbw packusdw pblendvb pblendw pcmpeqq pextrb pextrd pextrq phminposuw pinsrb pinsrd pinsrq pmaxsb pmaxsd pmaxud pmaxuw pminsb pminsd pminud pminuw pmovsxbw pmovsxbd pmovsxbq pmovsxwd pmovsxwq pmovsxdq pmovzxbw pmovzxbd pmovzxbq pmovzxwd pmovzxwq pmovzxdq pmuldq pmulld ptest roundpd roundps roundsd roundss crc32 pcmpestri pcmpestrm pcmpistri pcmpistrm pcmpgtq popcnt getsec pfrcpv pfrsqrtv movbe aesenc aesenclast aesdec aesdeclast aesimc aeskeygenassist vaesenc vaesenclast vaesdec vaesdeclast vaesimc vaeskeygenassist vaddpd vaddps vaddsd vaddss vaddsubpd vaddsubps vandpd vandps vandnpd vandnps vblendpd vblendps vblendvpd vblendvps vbroadcastss vbroadcastsd vbroadcastf128 vcmpeq_ospd vcmpeqpd vcmplt_ospd vcmpltpd vcmple_ospd vcmplepd vcmpunord_qpd vcmpunordpd vcmpneq_uqpd vcmpneqpd vcmpnlt_uspd vcmpnltpd vcmpnle_uspd vcmpnlepd vcmpord_qpd vcmpordpd vcmpeq_uqpd vcmpnge_uspd vcmpngepd vcmpngt_uspd vcmpngtpd vcmpfalse_oqpd vcmpfalsepd vcmpneq_oqpd vcmpge_ospd vcmpgepd vcmpgt_ospd vcmpgtpd vcmptrue_uqpd vcmptruepd vcmplt_oqpd vcmple_oqpd vcmpunord_spd vcmpneq_uspd vcmpnlt_uqpd vcmpnle_uqpd vcmpord_spd vcmpeq_uspd vcmpnge_uqpd vcmpngt_uqpd vcmpfalse_ospd vcmpneq_ospd vcmpge_oqpd vcmpgt_oqpd vcmptrue_uspd vcmppd vcmpeq_osps vcmpeqps vcmplt_osps vcmpltps vcmple_osps vcmpleps vcmpunord_qps vcmpunordps vcmpneq_uqps vcmpneqps vcmpnlt_usps vcmpnltps vcmpnle_usps vcmpnleps vcmpord_qps vcmpordps vcmpeq_uqps vcmpnge_usps vcmpngeps vcmpngt_usps vcmpngtps vcmpfalse_oqps vcmpfalseps vcmpneq_oqps vcmpge_osps vcmpgeps vcmpgt_osps vcmpgtps vcmptrue_uqps vcmptrueps vcmplt_oqps vcmple_oqps vcmpunord_sps vcmpneq_usps vcmpnlt_uqps vcmpnle_uqps vcmpord_sps vcmpeq_usps vcmpnge_uqps vcmpngt_uqps vcmpfalse_osps vcmpneq_osps vcmpge_oqps vcmpgt_oqps vcmptrue_usps vcmpps vcmpeq_ossd vcmpeqsd vcmplt_ossd vcmpltsd vcmple_ossd vcmplesd vcmpunord_qsd vcmpunordsd vcmpneq_uqsd vcmpneqsd vcmpnlt_ussd vcmpnltsd vcmpnle_ussd vcmpnlesd vcmpord_qsd vcmpordsd vcmpeq_uqsd vcmpnge_ussd vcmpngesd vcmpngt_ussd vcmpngtsd vcmpfalse_oqsd vcmpfalsesd vcmpneq_oqsd vcmpge_ossd vcmpgesd vcmpgt_ossd vcmpgtsd vcmptrue_uqsd vcmptruesd vcmplt_oqsd vcmple_oqsd vcmpunord_ssd vcmpneq_ussd vcmpnlt_uqsd vcmpnle_uqsd vcmpord_ssd vcmpeq_ussd vcmpnge_uqsd vcmpngt_uqsd vcmpfalse_ossd vcmpneq_ossd vcmpge_oqsd vcmpgt_oqsd vcmptrue_ussd vcmpsd vcmpeq_osss vcmpeqss vcmplt_osss vcmpltss vcmple_osss vcmpless vcmpunord_qss vcmpunordss vcmpneq_uqss vcmpneqss vcmpnlt_usss vcmpnltss vcmpnle_usss vcmpnless vcmpord_qss vcmpordss vcmpeq_uqss vcmpnge_usss vcmpngess vcmpngt_usss vcmpngtss vcmpfalse_oqss vcmpfalsess vcmpneq_oqss vcmpge_osss vcmpgess vcmpgt_osss vcmpgtss vcmptrue_uqss vcmptruess vcmplt_oqss vcmple_oqss vcmpunord_sss vcmpneq_usss vcmpnlt_uqss vcmpnle_uqss vcmpord_sss vcmpeq_usss vcmpnge_uqss vcmpngt_uqss vcmpfalse_osss vcmpneq_osss vcmpge_oqss vcmpgt_oqss vcmptrue_usss vcmpss vcomisd vcomiss vcvtdq2pd vcvtdq2ps vcvtpd2dq vcvtpd2ps vcvtps2dq vcvtps2pd vcvtsd2si vcvtsd2ss vcvtsi2sd vcvtsi2ss vcvtss2sd vcvtss2si vcvttpd2dq vcvttps2dq vcvttsd2si vcvttss2si vdivpd vdivps vdivsd vdivss vdppd vdpps vextractf128 vextractps vhaddpd vhaddps vhsubpd vhsubps vinsertf128 vinsertps vlddqu vldqqu vldmxcsr vmaskmovdqu vmaskmovps vmaskmovpd vmaxpd vmaxps vmaxsd vmaxss vminpd vminps vminsd vminss vmovapd vmovaps vmovd vmovq vmovddup vmovdqa vmovqqa vmovdqu vmovqqu vmovhlps vmovhpd vmovhps vmovlhps vmovlpd vmovlps vmovmskpd vmovmskps vmovntdq vmovntqq vmovntdqa vmovntpd vmovntps vmovsd vmovshdup vmovsldup vmovss vmovupd vmovups vmpsadbw vmulpd vmulps vmulsd vmulss vorpd vorps vpabsb vpabsw vpabsd vpacksswb vpackssdw vpackuswb vpackusdw vpaddb vpaddw vpaddd vpaddq vpaddsb vpaddsw vpaddusb vpaddusw vpalignr vpand vpandn vpavgb vpavgw vpblendvb vpblendw vpcmpestri vpcmpestrm vpcmpistri vpcmpistrm vpcmpeqb vpcmpeqw vpcmpeqd vpcmpeqq vpcmpgtb vpcmpgtw vpcmpgtd vpcmpgtq vpermilpd vpermilps vperm2f128 vpextrb vpextrw vpextrd vpextrq vphaddw vphaddd vphaddsw vphminposuw vphsubw vphsubd vphsubsw vpinsrb vpinsrw vpinsrd vpinsrq vpmaddwd vpmaddubsw vpmaxsb vpmaxsw vpmaxsd vpmaxub vpmaxuw vpmaxud vpminsb vpminsw vpminsd vpminub vpminuw vpminud vpmovmskb vpmovsxbw vpmovsxbd vpmovsxbq vpmovsxwd vpmovsxwq vpmovsxdq vpmovzxbw vpmovzxbd vpmovzxbq vpmovzxwd vpmovzxwq vpmovzxdq vpmulhuw vpmulhrsw vpmulhw vpmullw vpmulld vpmuludq vpmuldq vpor vpsadbw vpshufb vpshufd vpshufhw vpshuflw vpsignb vpsignw vpsignd vpslldq vpsrldq vpsllw vpslld vpsllq vpsraw vpsrad vpsrlw vpsrld vpsrlq vptest vpsubb vpsubw vpsubd vpsubq vpsubsb vpsubsw vpsubusb vpsubusw vpunpckhbw vpunpckhwd vpunpckhdq vpunpckhqdq vpunpcklbw vpunpcklwd vpunpckldq vpunpcklqdq vpxor vrcpps vrcpss vrsqrtps vrsqrtss vroundpd vroundps vroundsd vroundss vshufpd vshufps vsqrtpd vsqrtps vsqrtsd vsqrtss vstmxcsr vsubpd vsubps vsubsd vsubss vtestps vtestpd vucomisd vucomiss vunpckhpd vunpckhps vunpcklpd vunpcklps vxorpd vxorps vzeroall vzeroupper pclmullqlqdq pclmulhqlqdq pclmullqhqdq pclmulhqhqdq pclmulqdq vpclmullqlqdq vpclmulhqlqdq vpclmullqhqdq vpclmulhqhqdq vpclmulqdq vfmadd132ps vfmadd132pd vfmadd312ps vfmadd312pd vfmadd213ps vfmadd213pd vfmadd123ps vfmadd123pd vfmadd231ps vfmadd231pd vfmadd321ps vfmadd321pd vfmaddsub132ps vfmaddsub132pd vfmaddsub312ps vfmaddsub312pd vfmaddsub213ps vfmaddsub213pd vfmaddsub123ps vfmaddsub123pd vfmaddsub231ps vfmaddsub231pd vfmaddsub321ps vfmaddsub321pd vfmsub132ps vfmsub132pd vfmsub312ps vfmsub312pd vfmsub213ps vfmsub213pd vfmsub123ps vfmsub123pd vfmsub231ps vfmsub231pd vfmsub321ps vfmsub321pd vfmsubadd132ps vfmsubadd132pd vfmsubadd312ps vfmsubadd312pd vfmsubadd213ps vfmsubadd213pd vfmsubadd123ps vfmsubadd123pd vfmsubadd231ps vfmsubadd231pd vfmsubadd321ps vfmsubadd321pd vfnmadd132ps vfnmadd132pd vfnmadd312ps vfnmadd312pd vfnmadd213ps vfnmadd213pd vfnmadd123ps vfnmadd123pd vfnmadd231ps vfnmadd231pd vfnmadd321ps vfnmadd321pd vfnmsub132ps vfnmsub132pd vfnmsub312ps vfnmsub312pd vfnmsub213ps vfnmsub213pd vfnmsub123ps vfnmsub123pd vfnmsub231ps vfnmsub231pd vfnmsub321ps vfnmsub321pd vfmadd132ss vfmadd132sd vfmadd312ss vfmadd312sd vfmadd213ss vfmadd213sd vfmadd123ss vfmadd123sd vfmadd231ss vfmadd231sd vfmadd321ss vfmadd321sd vfmsub132ss vfmsub132sd vfmsub312ss vfmsub312sd vfmsub213ss vfmsub213sd vfmsub123ss vfmsub123sd vfmsub231ss vfmsub231sd vfmsub321ss vfmsub321sd vfnmadd132ss vfnmadd132sd vfnmadd312ss vfnmadd312sd vfnmadd213ss vfnmadd213sd vfnmadd123ss vfnmadd123sd vfnmadd231ss vfnmadd231sd vfnmadd321ss vfnmadd321sd vfnmsub132ss vfnmsub132sd vfnmsub312ss vfnmsub312sd vfnmsub213ss vfnmsub213sd vfnmsub123ss vfnmsub123sd vfnmsub231ss vfnmsub231sd vfnmsub321ss vfnmsub321sd rdfsbase rdgsbase rdrand wrfsbase wrgsbase vcvtph2ps vcvtps2ph adcx adox rdseed clac stac xstore xcryptecb xcryptcbc xcryptctr xcryptcfb xcryptofb montmul xsha1 xsha256 llwpcb slwpcb lwpval lwpins vfmaddpd vfmaddps vfmaddsd vfmaddss vfmaddsubpd vfmaddsubps vfmsubaddpd vfmsubaddps vfmsubpd vfmsubps vfmsubsd vfmsubss vfnmaddpd vfnmaddps vfnmaddsd vfnmaddss vfnmsubpd vfnmsubps vfnmsubsd vfnmsubss vfrczpd vfrczps vfrczsd vfrczss vpcmov vpcomb vpcomd vpcomq vpcomub vpcomud vpcomuq vpcomuw vpcomw vphaddbd vphaddbq vphaddbw vphadddq vphaddubd vphaddubq vphaddubw vphaddudq vphadduwd vphadduwq vphaddwd vphaddwq vphsubbw vphsubdq vphsubwd vpmacsdd vpmacsdqh vpmacsdql vpmacssdd vpmacssdqh vpmacssdql vpmacsswd vpmacssww vpmacswd vpmacsww vpmadcsswd vpmadcswd vpperm vprotb vprotd vprotq vprotw vpshab vpshad vpshaq vpshaw vpshlb vpshld vpshlq vpshlw vbroadcasti128 vpblendd vpbroadcastb vpbroadcastw vpbroadcastd vpbroadcastq vpermd vpermpd vpermps vpermq vperm2i128 vextracti128 vinserti128 vpmaskmovd vpmaskmovq vpsllvd vpsllvq vpsravd vpsrlvd vpsrlvq vgatherdpd vgatherqpd vgatherdps vgatherqps vpgatherdd vpgatherqd vpgatherdq vpgatherqq xabort xbegin xend xtest andn bextr blci blcic blsi blsic blcfill blsfill blcmsk blsmsk blsr blcs bzhi mulx pdep pext rorx sarx shlx shrx tzcnt tzmsk t1mskc valignd valignq vblendmpd vblendmps vbroadcastf32x4 vbroadcastf64x4 vbroadcasti32x4 vbroadcasti64x4 vcompresspd vcompressps vcvtpd2udq vcvtps2udq vcvtsd2usi vcvtss2usi vcvttpd2udq vcvttps2udq vcvttsd2usi vcvttss2usi vcvtudq2pd vcvtudq2ps vcvtusi2sd vcvtusi2ss vexpandpd vexpandps vextractf32x4 vextractf64x4 vextracti32x4 vextracti64x4 vfixupimmpd vfixupimmps vfixupimmsd vfixupimmss vgetexppd vgetexpps vgetexpsd vgetexpss vgetmantpd vgetmantps vgetmantsd vgetmantss vinsertf32x4 vinsertf64x4 vinserti32x4 vinserti64x4 vmovdqa32 vmovdqa64 vmovdqu32 vmovdqu64 vpabsq vpandd vpandnd vpandnq vpandq vpblendmd vpblendmq vpcmpltd vpcmpled vpcmpneqd vpcmpnltd vpcmpnled vpcmpd vpcmpltq vpcmpleq vpcmpneqq vpcmpnltq vpcmpnleq vpcmpq vpcmpequd vpcmpltud vpcmpleud vpcmpnequd vpcmpnltud vpcmpnleud vpcmpud vpcmpequq vpcmpltuq vpcmpleuq vpcmpnequq vpcmpnltuq vpcmpnleuq vpcmpuq vpcompressd vpcompressq vpermi2d vpermi2pd vpermi2ps vpermi2q vpermt2d vpermt2pd vpermt2ps vpermt2q vpexpandd vpexpandq vpmaxsq vpmaxuq vpminsq vpminuq vpmovdb vpmovdw vpmovqb vpmovqd vpmovqw vpmovsdb vpmovsdw vpmovsqb vpmovsqd vpmovsqw vpmovusdb vpmovusdw vpmovusqb vpmovusqd vpmovusqw vpord vporq vprold vprolq vprolvd vprolvq vprord vprorq vprorvd vprorvq vpscatterdd vpscatterdq vpscatterqd vpscatterqq vpsraq vpsravq vpternlogd vpternlogq vptestmd vptestmq vptestnmd vptestnmq vpxord vpxorq vrcp14pd vrcp14ps vrcp14sd vrcp14ss vrndscalepd vrndscaleps vrndscalesd vrndscaless vrsqrt14pd vrsqrt14ps vrsqrt14sd vrsqrt14ss vscalefpd vscalefps vscalefsd vscalefss vscatterdpd vscatterdps vscatterqpd vscatterqps vshuff32x4 vshuff64x2 vshufi32x4 vshufi64x2 kandnw kandw kmovw knotw kortestw korw kshiftlw kshiftrw kunpckbw kxnorw kxorw vpbroadcastmb2q vpbroadcastmw2d vpconflictd vpconflictq vplzcntd vplzcntq vexp2pd vexp2ps vrcp28pd vrcp28ps vrcp28sd vrcp28ss vrsqrt28pd vrsqrt28ps vrsqrt28sd vrsqrt28ss vgatherpf0dpd vgatherpf0dps vgatherpf0qpd vgatherpf0qps vgatherpf1dpd vgatherpf1dps vgatherpf1qpd vgatherpf1qps vscatterpf0dpd vscatterpf0dps vscatterpf0qpd vscatterpf0qps vscatterpf1dpd vscatterpf1dps vscatterpf1qpd vscatterpf1qps prefetchwt1 bndmk bndcl bndcu bndcn bndmov bndldx bndstx sha1rnds4 sha1nexte sha1msg1 sha1msg2 sha256rnds2 sha256msg1 sha256msg2 hint_nop0 hint_nop1 hint_nop2 hint_nop3 hint_nop4 hint_nop5 hint_nop6 hint_nop7 hint_nop8 hint_nop9 hint_nop10 hint_nop11 hint_nop12 hint_nop13 hint_nop14 hint_nop15 hint_nop16 hint_nop17 hint_nop18 hint_nop19 hint_nop20 hint_nop21 hint_nop22 hint_nop23 hint_nop24 hint_nop25 hint_nop26 hint_nop27 hint_nop28 hint_nop29 hint_nop30 hint_nop31 hint_nop32 hint_nop33 hint_nop34 hint_nop35 hint_nop36 hint_nop37 hint_nop38 hint_nop39 hint_nop40 hint_nop41 hint_nop42 hint_nop43 hint_nop44 hint_nop45 hint_nop46 hint_nop47 hint_nop48 hint_nop49 hint_nop50 hint_nop51 hint_nop52 hint_nop53 hint_nop54 hint_nop55 hint_nop56 hint_nop57 hint_nop58 hint_nop59 hint_nop60 hint_nop61 hint_nop62 hint_nop63',
			literal:
				'ip eip rip al ah bl bh cl ch dl dh sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w eax ebx ecx edx esi edi ebp esp eip r8d r9d r10d r11d r12d r13d r14d r15d rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 cs ds es fs gs ss st st0 st1 st2 st3 st4 st5 st6 st7 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 xmm0  xmm1  xmm2  xmm3  xmm4  xmm5  xmm6  xmm7  xmm8  xmm9 xmm10  xmm11 xmm12 xmm13 xmm14 xmm15 xmm16 xmm17 xmm18 xmm19 xmm20 xmm21 xmm22 xmm23 xmm24 xmm25 xmm26 xmm27 xmm28 xmm29 xmm30 xmm31 ymm0  ymm1  ymm2  ymm3  ymm4  ymm5  ymm6  ymm7  ymm8  ymm9 ymm10  ymm11 ymm12 ymm13 ymm14 ymm15 ymm16 ymm17 ymm18 ymm19 ymm20 ymm21 ymm22 ymm23 ymm24 ymm25 ymm26 ymm27 ymm28 ymm29 ymm30 ymm31 zmm0  zmm1  zmm2  zmm3  zmm4  zmm5  zmm6  zmm7  zmm8  zmm9 zmm10  zmm11 zmm12 zmm13 zmm14 zmm15 zmm16 zmm17 zmm18 zmm19 zmm20 zmm21 zmm22 zmm23 zmm24 zmm25 zmm26 zmm27 zmm28 zmm29 zmm30 zmm31 k0 k1 k2 k3 k4 k5 k6 k7 bnd0 bnd1 bnd2 bnd3 cr0 cr1 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr8 tr3 tr4 tr5 tr6 tr7 r0 r1 r2 r3 r4 r5 r6 r7 r0b r1b r2b r3b r4b r5b r6b r7b r0w r1w r2w r3w r4w r5w r6w r7w r0d r1d r2d r3d r4d r5d r6d r7d r0h r1h r2h r3h r0l r1l r2l r3l r4l r5l r6l r7l r8l r9l r10l r11l r12l r13l r14l r15l',
			pseudo:
				'db dw dd dq dt ddq do dy dz resb resw resd resq rest resdq reso resy resz incbin equ times',
			preprocessor:
				'%define %xdefine %+ %undef %defstr %deftok %assign %strcat %strlen %substr %rotate %elif %else %endif %ifmacro %ifctx %ifidn %ifidni %ifid %ifnum %ifstr %iftoken %ifempty %ifenv %error %warning %fatal %rep %endrep %include %push %pop %repl %pathsearch %depend %use %arg %stacksize %local %line %comment %endcomment .nolist byte word dword qword nosplit rel abs seg wrt strict near far a32 ptr __FILE__ __LINE__ __SECT__  __BITS__ __OUTPUT_FORMAT__ __DATE__ __TIME__ __DATE_NUM__ __TIME_NUM__ __UTC_DATE__ __UTC_TIME__ __UTC_DATE_NUM__ __UTC_TIME_NUM__  __PASS__ struc endstruc istruc at iend align alignb sectalign daz nodaz up down zero default option assume public ',
			built_in:
				'bits use16 use32 use64 default section segment absolute extern global common cpu float __utf16__ __utf16le__ __utf16be__ __utf32__ __utf32le__ __utf32be__ __float8__ __float16__ __float32__ __float64__ __float80m__ __float80e__ __float128l__ __float128h__ __Infinity__ __QNaN__ __SNaN__ Inf NaN QNaN SNaN float8 float16 float32 float64 float80m float80e float128l float128h __FLOAT_DAZ__ __FLOAT_ROUND__ __FLOAT__'
		},
		c: [
			{ cN: 'comment', b: ';', e: '$', r: 0 },
			{
				cN: 'number',
				b: '\\b(?:([0-9][0-9_]*)?\\.[0-9_]*(?:[eE][+-]?[0-9_]+)?|(0[Xx])?[0-9][0-9_]*\\.?[0-9_]*(?:[pP](?:[+-]?[0-9_]+)?)?)\\b',
				r: 0
			},
			{ cN: 'number', b: '\\$[0-9][0-9A-Fa-f]*', r: 0 },
			{
				cN: 'number',
				b: '\\b(?:[0-9A-Fa-f][0-9A-Fa-f_]*[HhXx]|[0-9][0-9_]*[DdTt]?|[0-7][0-7_]*[QqOo]|[0-1][0-1_]*[BbYy])\\b'
			},
			{
				cN: 'number',
				b: '\\b(?:0[HhXx][0-9A-Fa-f_]+|0[DdTt][0-9_]+|0[QqOo][0-7_]+|0[BbYy][0-1_]+)\\b'
			},
			s.QSM,
			{ cN: 'string', b: "'", e: "[^\\\\]'", r: 0 },
			{ cN: 'string', b: '`', e: '[^\\\\]`', r: 0 },
			{ cN: 'string', b: '\\.[A-Za-z0-9]+', r: 0 },
			{ cN: 'label', b: '^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)', r: 0 },
			{ cN: 'label', b: '^\\s*%%[A-Za-z0-9_$#@~.?]*:', r: 0 },
			{ cN: 'argument', b: '%[0-9]+', r: 0 },
			{ cN: 'built_in', b: '%!S+', r: 0 }
		]
	};
});
hljs.registerLanguage('scala', function (e) {
	var t = { cN: 'annotation', b: '@[A-Za-z]+' },
		a = { cN: 'string', b: 'u?r?"""', e: '"""', r: 10 },
		r = { cN: 'symbol', b: "'\\w[\\w\\d_]*(?!')" },
		c = { cN: 'type', b: '\\b[A-Z][A-Za-z0-9_]*', r: 0 },
		i = {
			cN: 'title',
			b: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
			r: 0
		},
		l = {
			cN: 'class',
			bK: 'class object trait type',
			e: /[:={\[(\n;]/,
			c: [{ cN: 'keyword', bK: 'extends with', r: 10 }, i]
		},
		n = { cN: 'function', bK: 'def val', e: /[:={\[(\n;]/, c: [i] };
	return {
		k: {
			literal: 'true false null',
			keyword:
				'type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit'
		},
		c: [e.CLCM, e.CBCM, a, e.QSM, r, c, n, l, e.CNM, t]
	};
});
