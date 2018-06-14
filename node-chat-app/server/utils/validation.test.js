const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        // given
        const str1 = undefined;
        const str2 = 1;
        const str3 = false;
        const str4 = {};
        const str5 = [];
        // when
        const res1 = isRealString(str1);
        const res2 = isRealString(str2);
        const res3 = isRealString(str3);
        const res4 = isRealString(str4);
        const res5 = isRealString(str5);
        // then
        expect(res1).toBeFalsy();
        expect(res2).toBeFalsy();
        expect(res3).toBeFalsy();
        expect(res4).toBeFalsy();
        expect(res5).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        // given
        const str = '   ';
        // when
        const res = isRealString(str);
        // then
        expect(res).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        // given
        const str = ' test ';
        // when
        const res = isRealString(str);
        // then
        expect(res).toBeTruthy();
    });
});
