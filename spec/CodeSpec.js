describe("CodeWithNothing", function() {
  var ourCode = require('../main');
  var numbers = ourCode.numbers;
  var math_op = ourCode.math_op;
  var boolean = ourCode.boolean;
  var logic_op = ourCode.logic_op;
  var comp_op = ourCode.comp_op;

  var to_boolean = ourCode.to_boolean;
  var to_integer = ourCode.to_integer;

  describe("When we call our numbers", function() {
    it("should be able to convert to native number", function() {
      expect(to_integer(numbers.ZERO)).toEqual(0);
      expect(to_integer(numbers.ONE)).toEqual(1);
      expect(to_integer(numbers.TWO)).toEqual(2);
      expect(to_integer(numbers.THREE)).toEqual(3);
      expect(to_integer(numbers.FIVE)).toEqual(5);
    });
  });

  describe("When we call our arithmetic operators", function() {
    it("should return correct value", function() {
      expect(to_integer(math_op.INCREMENT(numbers.ZERO))).toEqual(1);
      expect(to_integer(math_op.INCREMENT(numbers.TWO))).toEqual(3);

      expect(to_integer(math_op.ADD(numbers.ZERO)(numbers.ONE))).toEqual(1);
      expect(to_integer(math_op.MULTIPLY(numbers.TWO)(numbers.THREE))).toEqual(6);
      expect(to_integer(math_op.POWER(numbers.TWO)(numbers.THREE))).toEqual(8);

      expect(to_integer(math_op.DECREMENT(numbers.ZERO))).toEqual(0);
      expect(to_integer(math_op.DECREMENT(numbers.ONE))).toEqual(0);
      expect(to_integer(math_op.SUBTRACT(numbers.FIVE)(numbers.TWO))).toEqual(3);
      expect(to_integer(math_op.SUBTRACT(numbers.TWO)(numbers.THREE))).toEqual(0);
      
    });
  });

  
  describe("When we call modulo", function() {
    it("should return correct value", function() {
      expect(to_integer(math_op.MODULO(numbers.TWO)(numbers.THREE))).toEqual(2);
      expect(to_integer(math_op.MODULO(numbers.THREE)(numbers.TWO))).toEqual(1);
      expect(to_integer(math_op.MODULO(math_op.POWER(numbers.THREE)(numbers.THREE))(math_op.ADD(numbers.TWO)(numbers.THREE)))).toEqual(2);
      
    });
  });

  describe("When we call divide", function() {
    it("should return correct value", function() {
      expect(to_integer(math_op.DIVIDE(numbers.TWO)(numbers.THREE))).toEqual(0);
      expect(to_integer(math_op.DIVIDE(numbers.THREE)(numbers.TWO))).toEqual(1);
      expect(to_integer(math_op.DIVIDE(math_op.POWER(numbers.THREE)(numbers.THREE))(math_op.ADD(numbers.TWO)(numbers.THREE)))).toEqual(5);
      
    });
  });
  describe("When we call our booleans", function() {
    it("should be able to convert to native boolean", function() {
      expect(to_boolean(boolean.FALSE)).toBeFalsy();
      expect(to_boolean(boolean.TRUE)).toBeTruthy();
      
    });
  });

  describe("When we call our logic operators", function() {
    it("should return right logic", function() {
      expect(to_boolean(logic_op.AND(boolean.FALSE)(boolean.FALSE))).toBeFalsy();
      expect(to_boolean(logic_op.AND(boolean.FALSE)(boolean.TRUE))).toBeFalsy();
      expect(to_boolean(logic_op.AND(boolean.TRUE)(boolean.TRUE))).toBeTruthy();

      expect(to_boolean(logic_op.OR(boolean.FALSE)(boolean.FALSE))).toBeFalsy();
      expect(to_boolean(logic_op.OR(boolean.FALSE)(boolean.TRUE))).toBeTruthy();
      expect(to_boolean(logic_op.OR(boolean.TRUE)(boolean.TRUE))).toBeTruthy();

      expect(to_boolean(logic_op.XOR(boolean.FALSE)(boolean.FALSE))).toBeFalsy();
      expect(to_boolean(logic_op.XOR(boolean.FALSE)(boolean.TRUE))).toBeTruthy();
      expect(to_boolean(logic_op.XOR(boolean.TRUE)(boolean.TRUE))).toBeFalsy();

      expect(to_boolean(logic_op.NOT(boolean.TRUE))).toBeFalsy();
      expect(to_boolean(logic_op.NOT(boolean.FALSE))).toBeTruthy();
      
    });
  });

  describe("When we call our comparision operators", function() {
    it("should return right boolean", function() {

      expect(to_boolean(comp_op.IS_ZERO(numbers.THREE))).toBeFalsy();
      expect(to_boolean(comp_op.IS_ZERO(numbers.ZERO))).toBeTruthy();

      expect(to_boolean(comp_op.LESS_THAN_OR_EQUAL(numbers.THREE)(numbers.FIVE))).toBeTruthy();
      expect(to_boolean(comp_op.LESS_THAN_OR_EQUAL(numbers.FIVE)(numbers.THREE))).toBeFalsy();

      expect(to_boolean(comp_op.LESS_THAN(numbers.THREE)(numbers.FIVE))).toBeTruthy();
      expect(to_boolean(comp_op.LESS_THAN(numbers.FIVE)(numbers.THREE))).toBeFalsy();

      expect(to_boolean(comp_op.GREATER_THAN_OR_EQUAL(numbers.THREE)(numbers.FIVE))).toBeFalsy();
      expect(to_boolean(comp_op.GREATER_THAN_OR_EQUAL(numbers.FIVE)(numbers.THREE))).toBeTruthy();

      expect(to_boolean(comp_op.GREATER_THAN(numbers.THREE)(numbers.FIVE))).toBeFalsy();
      expect(to_boolean(comp_op.GREATER_THAN(numbers.FIVE)(numbers.THREE))).toBeTruthy();
    });
  });

});
