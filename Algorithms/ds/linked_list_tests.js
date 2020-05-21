
t1_1 = [1, 4, 8, 9];
t1_2 = [2, 3, 6, 8, 10];
t1_res = [1, 2, 3, 4, 6, 8, 9, 10];
console.log(UnionLists(CreateList(t1_1), CreateList(t1_2)).toString() == t1_res.toString());

t2_1 = [1, 2, 2, 2, 4, 6, 8, 9];
t2_2 = [3, 6, 8, 10];
t2_res = [1, 2, 2, 2, 3, 4, 6, 8, 9, 10];
console.log(UnionLists(CreateList(t2_1), CreateList(t2_2)).toString() == t2_res.toString());

t3_1 = [1, 2, 2, 2, 4, 6, 8, 9];
t3_2 = [3, 6, 8, 10];
t3_res = [1, 2, 2, 2, 3, 4, 6, 8, 9, 10];
console.log(UnionLists(CreateList(t3_1), CreateList(t3_2)).toString() == t3_res.toString());