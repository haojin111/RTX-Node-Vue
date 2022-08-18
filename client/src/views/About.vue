<template>
  <div class="about">
    <!-- 8. Display the data with a structured table in following columns, -->
    <!-- property.name | property.location.country | property.reviews.summary.score -->
    <el-table :data="pagedHotels" stripe style="width: 100%">
      <el-table-column prop="property.name" label="Name" />
      <el-table-column prop="property.location.country" label="Country" />
      <el-table-column prop="property.reviews.summary.score" label="Score" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="addTour(scope.row)">Add</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 9. Do a simple pagination of 5 per page-->
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="calcTotals"
      @current-change="setPage"
    >
    </el-pagination>
    <!-- 10. Hide the entry without country and/or score-->
    <div>
      <el-checkbox v-model="hideEmpty" label="Hide Empty Rows" size="large" />
    </div>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      hotels: [],
      page: 1,
      pageSize: 5,
      hideEmpty: false,
      total: 0,
    };
  },
  mounted() {
    axios.get('/api/fromSource')
      .then((res) => {
        this.hotels = res?.data?.outlets?.availability?.results || [];
      });
  },
  computed: {
    pagedHotels() {
      if (!this.hotels || this.hotels.length === 0) return [];
      const hotels = this.hideEmpty
        ? this.hotels.filter(
          (hotel) => hotel.property?.location?.country && hotel.property?.reviews?.summary?.score,
        ) : this.hotels;
      return hotels.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page,
      );
    },
    calcTotals() {
      return this.hideEmpty
        ? this.hotels.filter(
          (hotel) => hotel.property?.location?.country && hotel.property?.reviews?.summary?.score,
        ).length : this.hotels.length;
    },
  },
  methods: {
    setPage(val) {
      this.page = val;
    },
    addTour(row) {
      axios.post('/api/tours', {
        id: row.property?.propertyCode,
        name: row.property.name,
        country: row.property?.location?.country || 'US',
        score: row.property?.reviews?.summary?.score || 0,
      })
        .then((res) => {
          // should add error handlers
          console.log(res);
        });
    },
  },
};

</script>
