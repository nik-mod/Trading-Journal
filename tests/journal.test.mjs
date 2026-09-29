import {test} from 'node:test';
import assert from 'node:assert/strict';
import {blank,seed,pnl,rr,risk,validState,validateTrade,validDate} from '../lib/journal.ts';
const trade=()=>({...blank(),asset:'TEST',entry:100,stop:90,target:120,exit:110,size:2,fees:1});
test('long, short, costs, override and rounding',()=>{const t=trade();assert.equal(pnl(t),19);assert.equal(risk(t),20);assert.equal(rr(t),2);assert.equal(pnl({...t,direction:'Short',exit:90}),19);assert.equal(pnl({...t,override:'-42.25'}),-42.25);assert.equal(pnl({...t,entry:.1,exit:.3,size:1,fees:.2}),0)});
test('real calendar dates and risk direction validation',()=>{assert.equal(validDate('2026-02-30'),false);assert.equal(validDate('2024-02-29'),true);assert.equal(validateTrade(trade()),'');assert.ok(validateTrade({...trade(),stop:110}));assert.ok(validateTrade({...trade(),date:'2999-01-01'}));assert.ok(validateTrade({...trade(),violations:['risk']}))});
test('backup rejects malformed records without throwing',()=>{assert.equal(validState(seed()),true);for(const input of [null,{}, {...seed(),trades:[null]}, {...seed(),goals:[null]}, {...seed(),checks:[]}, {...seed(),rules:[null]}, {...seed(),trades:[{...trade(),date:42}]}])assert.equal(validState(input),false)});
test('backup rejects duplicates, orphan rules and over-target progress',()=>{const s=seed();assert.equal(validState({...s,trades:[s.trades[0],s.trades[0]]}),false);assert.equal(validState({...s,goals:[{id:'g',title:'Goal',target:1,current:2}]}),false);assert.equal(validState({...s,trades:[{...trade(),followed:false,violations:['missing']}]}),false)});
