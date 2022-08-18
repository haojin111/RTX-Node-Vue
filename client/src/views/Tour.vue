<template>
  <div class="tour">
    <div class="action-pad">
      <el-input v-model="tour.name" placeholder="Tour Name" />
      <el-input v-model="tour.country" placeholder="Country Code" />
      <el-input type="number" v-model="tour.score" placeholder="Score amount" />
      <el-button type="primary" @click="updateTour">Save</el-button>
    </div>
    <el-table :data="pagedTours" stripe style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="country" label="Country" />
      <el-table-column prop="score" label="Score" />
      <el-table-column fixed="right" label="Operations" width="220">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editTour(scope.row)">
            Edit
          </el-button>
          <el-button link type="danger" size="small" @click="deleteTour(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="pagedTours.length"
      @current-change="setPage"
    >
    </el-pagination>
  </div>
</template>
<style>
.tour .action-pad{
  display: flex;
}

.tour .action-pad .el-input,
.tour .action-pad button{
  margin: 5px 20px;
}

</style>

<script>
// import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      tour: {
        id: null,
        name: '',
        country: '',
        score: 0,
      },
      tours: [],
      page: 1,
      pageSize: 5,
      total: 0,
    };
  },
  mounted() {
    axios.get('/api/tours')
      .then((res) => {
        this.tours = res?.data || [];
      });
  },
  computed: {
    pagedTours() {
      if (!this.tours || this.tours.length === 0) return [];
      return this.tours.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page,
      );
    },
  },
  methods: {
    setPage(val) {
      this.page = val;
    },
    editTour(tour) {
      this.tour = tour;
    },
    deleteTour(tour) {
      axios.delete(`/api/tours/${tour.id}`)
        .then(() => {
          axios.get('/api/tours')
            .then((res) => {
              this.tours = res?.data || [];
            });
        });
    },
    updateTour() {
      if (!this.tour.id) return;
      const tourInfo = {
        name: this.tour.name,
        country: this.tour.country,
        score: this.tour.score,
      };
      delete tourInfo.id;
      axios.patch(`/api/tours/${this.tour.id}`, tourInfo)
        .then(() => {
          this.tour = {
            id: null,
            name: '',
            country: '',
            score: 0,
          };
          axios.get('/api/tours')
            .then((res) => {
              this.tours = res?.data || [];
            });
        });
    },
  },
};

</script>
