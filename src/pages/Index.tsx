import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Index = () => {
  const [selectedClass, setSelectedClass] = useState('10А');
  const [selectedSubject, setSelectedSubject] = useState('Математика');
  const [editingGrade, setEditingGrade] = useState<{ studentId: number; subject: string } | null>(null);
  const [studentsData, setStudentsData] = useState([
    { id: 1, name: 'Иванов Иван Иванович', class: '10А', math: 5, physics: 4, russian: 5, english: 4, avg: 4.5 },
    { id: 2, name: 'Петрова Анна Сергеевна', class: '10А', math: 5, physics: 5, russian: 4, english: 5, avg: 4.75 },
    { id: 3, name: 'Сидоров Петр Александрович', class: '10А', math: 4, physics: 4, russian: 4, english: 3, avg: 3.75 },
    { id: 4, name: 'Козлова Мария Дмитриевна', class: '10А', math: 5, physics: 5, russian: 5, english: 5, avg: 5.0 },
    { id: 5, name: 'Новиков Алексей Викторович', class: '10А', math: 3, physics: 3, russian: 4, english: 4, avg: 3.5 },
    { id: 6, name: 'Морозова Елена Игоревна', class: '10А', math: 4, physics: 5, russian: 4, english: 4, avg: 4.25 },
  ]);

  const statsData = [
    { title: 'Всего учеников', value: '342', icon: 'Users', color: 'text-primary' },
    { title: 'Классов', value: '12', icon: 'School', color: 'text-accent' },
    { title: 'Средний балл', value: '4.2', icon: 'TrendingUp', color: 'text-green-600' },
    { title: 'Предметов', value: '15', icon: 'BookOpen', color: 'text-secondary' },
  ];

  const updateGrade = (studentId: number, subject: string, newGrade: number) => {
    setStudentsData(prevStudents => {
      const updated = prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, [subject]: newGrade };
          const avg = (updatedStudent.math + updatedStudent.physics + updatedStudent.russian + updatedStudent.english) / 4;
          return { ...updatedStudent, avg: Math.round(avg * 100) / 100 };
        }
        return student;
      });
      return updated;
    });
    setEditingGrade(null);
    toast.success('Оценка обновлена!');
  };

  const classes = [
    { name: '9А', students: 28, teacher: 'Смирнова Е.П.', avg: 4.1 },
    { name: '9Б', students: 26, teacher: 'Кузнецов А.И.', avg: 3.9 },
    { name: '10А', students: 30, teacher: 'Петров И.С.', avg: 4.3 },
    { name: '10Б', students: 27, teacher: 'Волкова М.А.', avg: 4.0 },
    { name: '11А', students: 25, teacher: 'Соколов В.Н.', avg: 4.5 },
    { name: '11Б', students: 29, teacher: 'Лебедева О.В.', avg: 4.2 },
  ];

  const performanceData = [
    { month: 'Сентябрь', avg: 3.8 },
    { month: 'Октябрь', avg: 4.0 },
    { month: 'Ноябрь', avg: 4.1 },
    { month: 'Декабрь', avg: 4.2 },
    { month: 'Январь', avg: 4.0 },
    { month: 'Февраль', avg: 4.3 },
  ];

  const gradeDistribution = [
    { name: '5 (Отлично)', value: 35, color: '#10b981' },
    { name: '4 (Хорошо)', value: 40, color: '#0ea5e9' },
    { name: '3 (Удовл.)', value: 20, color: '#f59e0b' },
    { name: '2 (Неудовл.)', value: 5, color: '#ef4444' },
  ];

  const subjectPerformance = [
    { subject: 'Математика', avg: 4.2 },
    { subject: 'Физика', avg: 4.0 },
    { subject: 'Русский язык', avg: 4.3 },
    { subject: 'Английский', avg: 3.9 },
    { subject: 'История', avg: 4.1 },
    { subject: 'Химия', avg: 3.8 },
  ];

  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-green-100 text-green-800 border-green-300';
    if (grade === 4) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (grade === 3) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="GraduationCap" size={36} className="text-white" />
              <div>
                <h1 className="text-3xl font-bold">ЭЛ ГОРОД</h1>
                <p className="text-blue-100 text-sm">Электронный журнал успеваемости</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-white text-primary hover:bg-blue-50">
                <Icon name="Bell" size={18} className="mr-2" />
                Уведомления
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
                  АС
                </div>
                <div className="text-right">
                  <p className="font-semibold">Администратор</p>
                  <p className="text-xs text-blue-100">admin@school.ru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-primary">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon name={stat.icon} size={24} className={stat.color} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="journal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="journal" className="gap-2">
              <Icon name="BookOpen" size={16} />
              Журнал оценок
            </TabsTrigger>
            <TabsTrigger value="classes" className="gap-2">
              <Icon name="Users" size={16} />
              Классы
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Icon name="BarChart3" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Icon name="Calendar" size={16} />
              Расписание
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">Журнал успеваемости</CardTitle>
                    <CardDescription>Выберите класс и предмет для просмотра оценок</CardDescription>
                  </div>
                  <div className="flex gap-3">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.name} value={cls.name}>{cls.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Математика">Математика</SelectItem>
                        <SelectItem value="Физика">Физика</SelectItem>
                        <SelectItem value="Русский язык">Русский язык</SelectItem>
                        <SelectItem value="Английский">Английский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-100">
                        <TableHead className="font-bold">№</TableHead>
                        <TableHead className="font-bold">Ученик</TableHead>
                        <TableHead className="font-bold text-center">Математика</TableHead>
                        <TableHead className="font-bold text-center">Физика</TableHead>
                        <TableHead className="font-bold text-center">Русский язык</TableHead>
                        <TableHead className="font-bold text-center">Английский</TableHead>
                        <TableHead className="font-bold text-center">Средний балл</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentsData.map((student, index) => (
                        <TableRow key={student.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center gap-1">
                              {editingGrade?.studentId === student.id && editingGrade?.subject === 'math' ? (
                                <div className="flex gap-1">
                                  {[2, 3, 4, 5].map(grade => (
                                    <Button
                                      key={grade}
                                      size="sm"
                                      variant="outline"
                                      className={`w-8 h-8 p-0 ${getGradeColor(grade)} hover:scale-110 transition-transform`}
                                      onClick={() => updateGrade(student.id, 'math', grade)}
                                    >
                                      {grade}
                                    </Button>
                                  ))}
                                </div>
                              ) : (
                                <Badge 
                                  className={`${getGradeColor(student.math)} border font-semibold cursor-pointer hover:scale-110 transition-transform`}
                                  onClick={() => setEditingGrade({ studentId: student.id, subject: 'math' })}
                                >
                                  {student.math}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center gap-1">
                              {editingGrade?.studentId === student.id && editingGrade?.subject === 'physics' ? (
                                <div className="flex gap-1">
                                  {[2, 3, 4, 5].map(grade => (
                                    <Button
                                      key={grade}
                                      size="sm"
                                      variant="outline"
                                      className={`w-8 h-8 p-0 ${getGradeColor(grade)} hover:scale-110 transition-transform`}
                                      onClick={() => updateGrade(student.id, 'physics', grade)}
                                    >
                                      {grade}
                                    </Button>
                                  ))}
                                </div>
                              ) : (
                                <Badge 
                                  className={`${getGradeColor(student.physics)} border font-semibold cursor-pointer hover:scale-110 transition-transform`}
                                  onClick={() => setEditingGrade({ studentId: student.id, subject: 'physics' })}
                                >
                                  {student.physics}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center gap-1">
                              {editingGrade?.studentId === student.id && editingGrade?.subject === 'russian' ? (
                                <div className="flex gap-1">
                                  {[2, 3, 4, 5].map(grade => (
                                    <Button
                                      key={grade}
                                      size="sm"
                                      variant="outline"
                                      className={`w-8 h-8 p-0 ${getGradeColor(grade)} hover:scale-110 transition-transform`}
                                      onClick={() => updateGrade(student.id, 'russian', grade)}
                                    >
                                      {grade}
                                    </Button>
                                  ))}
                                </div>
                              ) : (
                                <Badge 
                                  className={`${getGradeColor(student.russian)} border font-semibold cursor-pointer hover:scale-110 transition-transform`}
                                  onClick={() => setEditingGrade({ studentId: student.id, subject: 'russian' })}
                                >
                                  {student.russian}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center gap-1">
                              {editingGrade?.studentId === student.id && editingGrade?.subject === 'english' ? (
                                <div className="flex gap-1">
                                  {[2, 3, 4, 5].map(grade => (
                                    <Button
                                      key={grade}
                                      size="sm"
                                      variant="outline"
                                      className={`w-8 h-8 p-0 ${getGradeColor(grade)} hover:scale-110 transition-transform`}
                                      onClick={() => updateGrade(student.id, 'english', grade)}
                                    >
                                      {grade}
                                    </Button>
                                  ))}
                                </div>
                              ) : (
                                <Badge 
                                  className={`${getGradeColor(student.english)} border font-semibold cursor-pointer hover:scale-110 transition-transform`}
                                  onClick={() => setEditingGrade({ studentId: student.id, subject: 'english' })}
                                >
                                  {student.english}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-bold text-lg text-primary">{student.avg.toFixed(2)}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Управление классами</CardTitle>
                <CardDescription>Список классов и основная информация</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <Card key={cls.name} className="border-l-4 border-primary hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{cls.name}</CardTitle>
                            <CardDescription className="mt-1">{cls.teacher}</CardDescription>
                          </div>
                          <Badge className="bg-accent text-white">{cls.students} уч.</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Средний балл:</span>
                            <span className="text-lg font-bold text-primary">{cls.avg}</span>
                          </div>
                          <Button className="w-full" variant="outline">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Просмотр
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика успеваемости</CardTitle>
                  <CardDescription>Средний балл по месяцам</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="avg" stroke="#1e3a8a" strokeWidth={3} name="Средний балл" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Распределение оценок</CardTitle>
                  <CardDescription>Процентное соотношение</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Успеваемость по предметам</CardTitle>
                  <CardDescription>Средний балл по всем предметам</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[3, 5]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avg" fill="#0ea5e9" name="Средний балл" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Расписание уроков</CardTitle>
                <CardDescription>Расписание на текущую неделю</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'].map((day, dayIndex) => (
                    <Card key={day} className="border-l-4 border-accent">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{day}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {['Математика', 'Физика', 'Русский язык', 'Английский', 'История', 'Химия'].slice(0, 5).map((subject, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{subject}</p>
                                <p className="text-xs text-muted-foreground">Каб. {100 + index + dayIndex * 10}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;