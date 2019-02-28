/*
    Canadian History
    - War of 1912
    -- English Course
    -- Canadian Course
    - Jean Cretian
    USA history
    - Trump
       

*/

var courseStructureInput = [
    { 'name': 'Canadian History', 'id': 0, 'parent': 'null' },
    { 'name': 'Jean Cretiean', 'id': 1, 'parent': 0 },
    { 'name': 'War of 1912', 'id': 2, 'parent': 0 },
    { 'name': 'English Course', 'id': 3, 'parent': 2 },
    { 'name': 'USA history', 'id': 4, 'parent': 'null' },
    { 'name': 'Trump', 'id': 5, 'parent': 4 },
    { 'name': 'Canadian Coursey', 'id': 6, 'parent': 2 }
];

var answer ={};

courseStructureInput.forEach(course => {
    if(answer[course.parent] === undefined) {
        answer[course.parent] = [];
    }
    answer[course.parent].push(course.id);
});

console.log(answer);

mining(answer['null'],'');

function mining (potentialParents, dashes) {
    for(var i = 0; i < potentialParents.length; i++) {
        var potentialParent = potentialParents[i];
        
        console.log(dashes, potentialParent); 
        if(potentialParentIsAParent(potentialParent)) {
            mining(answer[potentialParent], dashes + "-");
        }
    }
}

function potentialParentIsAParent(potentialParent) {
    return answer[potentialParent] !== undefined;
}