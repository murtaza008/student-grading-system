// MOCK DATA FOR FRONTEND TESTING
const mockSections = ['Math101', 'Physics201', 'Chemistry301'];

// Extended mock data structure for courses with sections
const mockCourses = [
    {
        id: '1',
        code: 'Math101',
        name: 'Introduction to Mathematics',
        section: 'W1',
        maxStudents: 30,
        createdAt: '2024-01-15T10:00:00Z'
    },
    {
        id: '2',
        code: 'Math101',
        name: 'Introduction to Mathematics',
        section: 'W2',
        maxStudents: 25,
        createdAt: '2024-01-15T11:00:00Z'
    },
    {
        id: '3',
        code: 'Physics201',
        name: 'Advanced Physics',
        section: 'W3',
        maxStudents: 20,
        createdAt: '2024-01-20T14:30:00Z'
    },
    {
        id: '4',
        code: 'Chemistry301',
        name: 'Organic Chemistry',
        section: 'Section A',
        maxStudents: 20,
        createdAt: '2024-02-01T09:15:00Z'
    }
];

const mockStudents = {
    Math101: [
        {
            id: 1,
            rollNo: 'F2022065111',
            name: 'Alice Johnson',
            marks: {
                quiz1: { obtained: 17, total: 20 },
                assignment1: { obtained: 46, total: 50 },
                assignment2: { obtained: 44, total: 50 },
                mid: { obtained: 45, total: 50 },
                final: { obtained: 87, total: 100 }
            }
        },
        {
            id: 2,
            rollNo: 'F2022065112',
            name: 'Bob Smith',
            marks: {
                quiz1: { obtained: 14, total: 20 },
                assignment1: { obtained: 42, total: 50 },
                assignment2: { obtained: 39, total: 50 },
                mid: { obtained: 41, total: 50 },
                final: { obtained: 84, total: 100 }
            }
        },
    ],
    Physics201: [
        {
            id: 3,
            rollNo: 'P201-01',
            name: 'Charlie Brown',
            marks: {
                quiz1: { obtained: 19, total: 20 },
                quiz2: { obtained: 17, total: 20 },
                assignment1: { obtained: 45, total: 50 },
                assignment2: { obtained: 46, total: 50 },
                mid: { obtained: 47, total: 50 },
                final: { obtained: 91, total: 100 }
            }
        },
        {
            id: 4,
            rollNo: 'P201-02',
            name: 'Diana Prince',
            marks: {
                quiz1: { obtained: 17, total: 20 },
                quiz2: { obtained: 16, total: 20 },
                assignment1: { obtained: 43, total: 50 },
                assignment2: { obtained: 44, total: 50 },
                mid: { obtained: 43, total: 50 },
                final: { obtained: 90, total: 100 }
            }
        },
    ],
    Chemistry301: [
        {
            id: 5,
            rollNo: 'C301-01',
            name: 'Eve Adams',
            marks: {
                quiz1: { obtained: 18, total: 20 },
                quiz2: { obtained: 19, total: 20 },
                assignment1: { obtained: 44, total: 50 },
                assignment2: { obtained: 45, total: 50 },
                mid: { obtained: 44, total: 50 },
                final: { obtained: 93, total: 100 }
            }
        },
    ],
};

// --- LocalStorage Helpers ---
const STORAGE_KEYS = {
    courses: 'sgs_courses',
    sections: 'sgs_sections',
    students: 'sgs_students',
};

function saveToStorage() {
    localStorage.setItem(STORAGE_KEYS.courses, JSON.stringify(mockCourses));
    localStorage.setItem(STORAGE_KEYS.sections, JSON.stringify(mockSections));
    localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(mockStudents));
}

function loadFromStorage() {
    const courses = localStorage.getItem(STORAGE_KEYS.courses);
    const sections = localStorage.getItem(STORAGE_KEYS.sections);
    const students = localStorage.getItem(STORAGE_KEYS.students);
    if (courses) {
        try {
            const parsed = JSON.parse(courses);
            mockCourses.length = 0;
            mockCourses.push(...parsed);
        } catch { }
    }
    if (sections) {
        try {
            const parsed = JSON.parse(sections);
            mockSections.length = 0;
            mockSections.push(...parsed);
        } catch { }
    }
    if (students) {
        try {
            const parsed = JSON.parse(students);
            Object.keys(mockStudents).forEach(k => delete mockStudents[k]);
            Object.entries(parsed).forEach(([k, v]) => {
                mockStudents[k] = v;
            });
        } catch { }
    }
}

// Load from localStorage on startup
loadFromStorage();

export const getSections = async () => {
    return [...mockSections];
};

export const getCourses = async () => {
    return [...mockCourses];
};

export const addCourse = async (course) => {
    // Check if course with same code and section already exists
    const existingCourse = mockCourses.find(
        c => c.code === course.code && c.section === course.section
    );

    if (existingCourse) {
        throw new Error(`A course with code "${course.code}" and section "${course.section}" already exists.`);
    }

    const newCourse = {
        ...course,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };
    mockCourses.push(newCourse);

    // Add to sections list if not already there
    if (!mockSections.includes(course.code)) {
        mockSections.push(course.code);
    }
    // Initialize students array for new section if not present
    if (!mockStudents[course.code]) {
        mockStudents[course.code] = [];
    }
    saveToStorage();
    return newCourse;
};

export const updateCourse = async (courseId, updatedCourse) => {
    const index = mockCourses.findIndex(c => c.id === courseId);
    if (index !== -1) {
        const oldCode = mockCourses[index].code;
        mockCourses[index] = { ...mockCourses[index], ...updatedCourse };

        // Update section list if code changed
        const sectionIndex = mockSections.indexOf(oldCode);
        if (sectionIndex !== -1 && updatedCourse.code) {
            mockSections[sectionIndex] = updatedCourse.code;
        }
        saveToStorage();
        return mockCourses[index];
    }
    throw new Error('Course not found');
};

export const deleteCourse = async (courseId) => {
    const index = mockCourses.findIndex(c => c.id === courseId);
    if (index !== -1) {
        const course = mockCourses[index];
        mockCourses.splice(index, 1);

        // Remove from sections list
        const sectionIndex = mockSections.indexOf(course.code);
        if (sectionIndex !== -1) {
            mockSections.splice(sectionIndex, 1);
        }
        // Remove students for this section
        if (mockStudents[course.code]) {
            delete mockStudents[course.code];
        }
        saveToStorage();
        return { success: true };
    }
    throw new Error('Course not found');
};

export const getStudents = async (sectionId) => {
    return mockStudents[sectionId] ? [...mockStudents[sectionId]] : [];
};

export const addStudent = async (sectionId, student) => {
    if (!mockStudents[sectionId]) {
        mockStudents[sectionId] = [];
    }
    const newId = Math.max(0, ...mockStudents[sectionId].map(s => s.id)) + 1;
    const newStudent = { ...student, id: newId };
    mockStudents[sectionId].push(newStudent);
    saveToStorage();
    return newStudent;
};

export const updateStudent = async (sectionId, student) => {
    const idx = mockStudents[sectionId].findIndex(s => s.id === student.id);
    if (idx !== -1) mockStudents[sectionId][idx] = { ...student };
    saveToStorage();
    return student;
};

export const deleteStudent = async (sectionId, studentId) => {
    const idx = mockStudents[sectionId].findIndex(s => s.id === studentId);
    if (idx !== -1) mockStudents[sectionId].splice(idx, 1);
    saveToStorage();
    return { success: true };
};

export const giveGrades = async (sectionId) => {
    mockStudents[sectionId].forEach(s => {
        if (!s.marks) {
            s.marks = {
                quiz1: { obtained: Math.floor(Math.random() * 21) + 0, total: 20 },
                quiz2: { obtained: Math.floor(Math.random() * 21) + 0, total: 20 },
                assignment1: { obtained: Math.floor(Math.random() * 51) + 0, total: 50 },
                assignment2: { obtained: Math.floor(Math.random() * 51) + 0, total: 50 },
                mid: { obtained: Math.floor(Math.random() * 51) + 0, total: 50 },
                final: { obtained: Math.floor(Math.random() * 101) + 0, total: 100 }
            };
        }
    });
    saveToStorage();
    return { success: true };
};

export const addMarksBulk = async (sectionId, studentsWithMarks) => {
    Object.values(studentsWithMarks).forEach(updatedStudent => {
        const studentIndex = mockStudents[sectionId].findIndex(s => s.id === updatedStudent.id);
        if (studentIndex !== -1) {
            mockStudents[sectionId][studentIndex] = updatedStudent;
        }
    });
    saveToStorage();
    return { success: true };
};

export const calculateGradesBulk = async (sectionId, students, weightages, boundaries) => {
    students.forEach(student => {
        let total = 0;
        let totalWeight = 0;
        Object.entries(weightages).forEach(([type, weight]) => {
            const mark = student.marks?.[type];
            if (mark && mark.total > 0) {
                const percent = (mark.obtained / mark.total) * 100;
                total += percent * (weight / 100);
                totalWeight += weight;
            }
        });
        if (totalWeight > 0 && totalWeight < 100) {
            total = total * (100 / totalWeight);
        }
        let grade = 'F';
        for (const b of boundaries) {
            if (total >= b.min) {
                grade = b.grade;
                break;
            }
        }
        const idx = mockStudents[sectionId].findIndex(s => s.id === student.id);
        if (idx !== -1) {
            mockStudents[sectionId][idx].grade = grade;
        }
    });
    saveToStorage();
    return { success: true };
}; 