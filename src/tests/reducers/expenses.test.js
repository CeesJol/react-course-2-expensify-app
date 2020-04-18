import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
})

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should not remove expenses if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
})

test('should add expense', () => {
	const action = {
		type: 'ADD_EXPENSE',
		expense: {
			id: '999',
			description: 'Foo',
			note: 'Bar',
			amount: 420,
			createdAt: 0
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, action.expense]);
})

test('should edit expense', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			note: 'Something new',
			amount: 1337,
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state[0].note).toBe(action.updates.note);
	expect(state[0].amount).toBe(action.updates.amount);
})

test('should not edit expense if expense not found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			note: 'Something new',
			amount: 1337,
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
})

test('should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [expenses[1]]
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[1]]);
});