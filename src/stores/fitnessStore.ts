import {
  defineStore
} from "pinia"



import type {
  FitnessPlan
} from "@/models/FitnessPlan"



import type {
  FitnessRecord
} from "@/models/FitnessRecord"



import type {
  BodyMetric
} from "@/models/BodyMetric"




import {

  addFitnessPlan,

  getFitnessPlans,

  deleteFitnessPlan,

  addFitnessRecord,

  getFitnessRecords,
  addBodyMetric,

  getBodyMetrics,

  updateFitnessPlan


} from "@/services/fitnessService"


export const useFitnessStore =

  defineStore(

    "fitness",

    {
      state: () => ({
        //训练计划
        plans: [] as FitnessPlan[],

        //训练记录
        records: [] as FitnessRecord[],

        //身体数据
        bodyMetrics: [] as BodyMetric[]

      }),


      actions: {
        /*
         * 加载所有健身数据
         */
        async loadFitness() {
          this.plans = await getFitnessPlans()

          this.records = await getFitnessRecords()

          this.bodyMetrics = await getBodyMetrics()

        },

        /*
         * 新增训练计划
         */
        async createPlan(
          plan: FitnessPlan
        ) {
          await addFitnessPlan(
            plan
          )
          this.plans.push(
            plan
          )
        },


        async updatePlan(
          plan: FitnessPlan
        ) {
          const data =
            JSON.parse(
              JSON.stringify(plan)
            )
          await updateFitnessPlan(data)
          await this.loadFitness()

        },


        /*
         * 新增训练记录
         */
        async createRecord(
          record: FitnessRecord

        ) {

          await addFitnessRecord(
            record
          )

          this.records.push(
            record
          )


        },


        /*
         * 新增身体数据
         */
        async createBodyMetric(

          metric: BodyMetric
        ) {


          await addBodyMetric(
            metric
          )


          this.bodyMetrics.push(
            metric
          )
        },

        async removePlan(
          id: string
        ) {

          await deleteFitnessPlan(id)


          await this.loadFitness()

        },
      }
    }
  )