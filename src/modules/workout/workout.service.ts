
export type Workout = {
  id: string
  name: string
  userId: string
  createdAt: Date
}

export class WorkoutService {
  private workouts: Workout[] = []


  async create(data: {name: string; userId: string}): Promise<Workout> {
    const workout: Workout = {
      id: crypto.randomUUID(),
      name: data.name,
      userId: data.userId,
      createdAt: new Date(),
    }

    this.workouts.push(workout)
    
    return workout
  }

  async findAllByUser(userId: string): Promise<Workout[]> {
    return this.workouts.filter(workout => workout.userId === userId)
  }
}
