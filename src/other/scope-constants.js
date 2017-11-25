  import {_m} from './scope-util.js';

var ST_GLOBAL = 1,
    ST_MODULE = ST_GLOBAL << 1,
    ST_SCRIPT = ST_MODULE << 1,
    ST_EXPR = ST_SCRIPT << 1,
    ST_DECL = ST_EXPR << 1,
    ST_OBJ = ST_DECL << 1,
    ST_FN = ST_OBJ << 1,
    ST_CLS = ST_FN << 1,
    ST_CLSMEM = ST_CLS << 1,
    ST_STATICMEM = ST_CLSMEM << 1,
    ST_OBJMEM = ST_STATICMEM << 1,
    ST_METH = ST_OBJMEM << 1,
    ST_CTOR = ST_METH << 1,
    ST_SETTER = ST_CTOR << 1,
    ST_GETTER = ST_SETTER << 1,
    ST_ACCESSOR = ST_GETTER|ST_SETTER,
    ST_ARROW = ST_GETTER << 1,
    ST_BUNDLE = ST_ARROW << 1,
    ST_GEN = ST_BUNDLE << 1,
    ST_ASYNC = ST_GEN << 1,
    ST_BLOCK = ST_ASYNC << 1,
    ST_BARE = ST_BLOCK << 1,
    ST_CATCH = ST_BARE << 1,
    ST_PAREN = ST_CATCH << 1,
    ST_NONE = 0;

var SA_THROW = 1,
    SA_AWAIT = SA_THROW << 1,
    SA_BREAK = SA_AWAIT << 1,
    SA_YIELD = SA_BREAK << 1,
    SA_RETURN = SA_YIELD << 1,
    SA_CONTINUE = SA_RETURN << 1,
    SA_NEW_TARGET = SA_CONTINUE << 1,
    SA_CALLSUPER = SA_NEW_TARGET << 1,
    SA_MEMSUPER = SA_CALLSUPER << 1,
    SA_NONE = 0;

var SF_LOOP = 1,
    SF_UNIQUE = SF_LOOP << 1,
    SF_STRICT = SF_UNIQUE << 1,
    SF_ARGS = SF_STRICT << 1,
    SF_INSIDEIF = SF_ARGS << 1,
    SF_COND = SF_INSIDEIF << 1,
    SF_FORINIT = SF_COND << 1,
    SF_WITH_SCALL = SF_FORINIT << 1,
    SF_HERITAGE = SF_WITH_SCALL << 1,
    SF_WITH_SMEM = SF_HERITAGE << 1,
    SF_INSIDEPROLOGUE = SF_WITH_SMEM << 1,
    SF_NONE = 0;

var DT_CLS = 1,
    DT_FN = DT_CLS << 1,
    DT_CONST = DT_FN << 1,
    DT_VAR = DT_CONST << 1,
    DT_CATCHARG = DT_VAR << 1,
    DT_SPECIAL = DT_CATCHARG << 1,
    DT_LIQUID = DT_SPECIAL << 1,
    DT_LET = DT_LIQUID << 1,
    DT_ARGUMENTS = DT_LET << 1,
    DT_FNARG = DT_ARGUMENTS << 1,
    DT_CLSNAME = DT_FNARG << 1,
    DT_IDEFAULT = DT_CLSNAME << 1,
    DT_IALIASED = DT_IDEFAULT << 1,
    DT_INAMESPACE = DT_IALIASED << 1,
    DT_INFERRED = DT_INAMESPACE << 1,
    DT_GLOBAL = DT_INFERRED << 1,
    DT_FNNAME = DT_GLOBAL << 1,
    DT_EDEFAULT = DT_FNNAME << 1,
    DT_EALIASED = DT_EDEFAULT << 1,
    DT_ESELF = DT_EALIASED << 1,
    DT_EFW = DT_ESELF << 1,
    DT_BOMB = DT_EFW << 1 ,
    DT_EXPORTED = DT_EDEFAULT|DT_EALIASED|DT_ESELF,
    DT_IMPORTED = DT_IDEFAULT|DT_IALIASED|DT_INAMESPACE,
    DT_NONE = 0;

var RS_ARGUMENTS = _m('arguments'),
    RS_SCALL = _m('special:scall'),
    RS_THIS = _m('special:this');

var ATS_DISTINCT = 1,
    ATS_UNSURE = ATS_DISTINCT << 1,
    ATS_SAME = ATS_UNSURE << 1;

//   line sourcemap
//var LSM_NEED_NO_LINKPOINT = 1,
//    LSM_MUST_HAVE_LINKPOINT = LSM_MUST_HAVE_LINKPOINT << 1,
//    LSM_RECORDED_LINKPOINT = LSM_MUST_HAVE_LINKPOINT << 1,
//    LSM_NONE = 0;
 

 export {ST_GLOBAL, ST_MODULE, ST_SCRIPT, ST_EXPR, ST_DECL, ST_OBJ, ST_FN, ST_CLS, ST_CLSMEM, ST_STATICMEM, ST_OBJMEM, ST_METH, ST_CTOR, ST_SETTER, ST_GETTER, ST_ACCESSOR, ST_ARROW, ST_BUNDLE, ST_GEN, ST_ASYNC, ST_BLOCK, ST_BARE, ST_CATCH, ST_PAREN, ST_NONE, SA_THROW, SA_AWAIT, SA_BREAK, SA_YIELD, SA_RETURN, SA_CONTINUE, SA_NEW_TARGET, SA_CALLSUPER, SA_MEMSUPER, SA_NONE, SF_LOOP, SF_UNIQUE, SF_STRICT, SF_ARGS, SF_INSIDEIF, SF_COND, SF_FORINIT, SF_WITH_SCALL, SF_HERITAGE, SF_WITH_SMEM, SF_INSIDEPROLOGUE, SF_NONE, DT_CLS, DT_FN, DT_CONST, DT_VAR, DT_CATCHARG, DT_SPECIAL, DT_LIQUID, DT_LET, DT_ARGUMENTS, DT_FNARG, DT_CLSNAME, DT_IDEFAULT, DT_IALIASED, DT_INAMESPACE, DT_INFERRED, DT_GLOBAL, DT_FNNAME, DT_EDEFAULT, DT_EALIASED, DT_ESELF, DT_EFW, DT_BOMB, DT_EXPORTED, DT_IMPORTED, DT_NONE, RS_ARGUMENTS, RS_SCALL, RS_THIS, ATS_DISTINCT, ATS_UNSURE, ATS_SAME};