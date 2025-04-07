import { defineStore } from 'pinia'

interface Challenge {
  id: number,
  title: string,
  description: string,
  deadline: string
}

interface ChallengeCreate {
  title: string,
  description: string,
  deadline: string
}

export const useChallengesStore = defineStore('Challenges', {
  state: () => ({
    allChallenges: [] as Challenge[],
    userChallenges: [],
    userJoinedChallenges: []
  }),
  actions: {
    async createChallenge(body: ChallengeCreate, authToken: string) {
      const data = await $fetch('/api/challenges', {
        method: 'POST',
        headers: {
          auth: authToken
        },
        body
      });
      console.log(data);
      this.loadChallenges()
    },

    async loadChallenges() {
      const { data: challenges } = await useFetch('/api/challenges', {
        method: 'GET'
      });

      this.allChallenges = challenges.value || [];
    },

    updateChallenge() {

    },

    joinChallenge() {

    },

    deleteChallenge() {

    }
  }
})
