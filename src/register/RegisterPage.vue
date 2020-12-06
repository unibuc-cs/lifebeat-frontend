<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" v-model="user.email" v-validate="'required'" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
            </div>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" v-model="user.firstName" v-validate="'required'" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('firstName') }" />
                <div v-if="submitted && errors.has('firstName')" class="invalid-feedback">{{ errors.first('firstName') }}</div>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" v-model="user.lastName" v-validate="'required'" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('lastName') }" />
                <div v-if="submitted && errors.has('lastName')" class="invalid-feedback">{{ errors.first('lastName') }}</div>
            </div>
            <div class="form-group">
                <label for="height">Height (cm)</label>
                <input type="text" v-model="user.height" v-validate="'required'" name="height" class="form-control" :class="{ 'is-invalid': submitted && errors.has('height') }" />
                <div v-if="submitted && errors.has('height')" class="invalid-feedback">{{ errors.first('height') }}</div>
            </div>
            <div class="form-group">
                <label for="weight">Weight (kg)</label>
                <input type="text" v-model="user.weight" v-validate="'required'" name="weight" class="form-control" :class="{ 'is-invalid': submitted && errors.has('weight') }" />
                <div v-if="submitted && errors.has('weight')" class="invalid-feedback">{{ errors.first('weight') }}</div>
            </div>

            <div class="form-group">
                <label htmlFor="gender">Gender:</label><br>

                <input type="radio" v-model="user.gender" v-validate="'required'" name="gender" value="male" :class="{ 'is-invalid': submitted && errors.has('gender') }" />
                <label for="male">Male</label><br>
                
                <input type="radio" v-model="user.gender" v-validate="'required'" name="gender" value="female" :class="{ 'is-invalid': submitted && errors.has('gender') }" />
                <label for="male">Female</label><br>
                
                <input type="radio" v-model="user.gender" v-validate="'required'" name="gender" value="other" :class="{ 'is-invalid': submitted && errors.has('gender') }" />
                <label for="male">Other</label><br>

                <div v-if="submitted && errors.has('gender')" class="invalid-feedback">{{ errors.first('gender') }}</div>
            </div>

            <div class="form-group">
                <label for="scope">Why do you want to use the app?</label>
                <select v-model="user.scope" class="form-control" v-validate="'required'" :class="{ 'is-invalid': submitted && errors.has('scope') }">
                    <option value='L'>Lose weight</option>
                    <option value='M'>Muscle increase</option>
                    <option value='S'>Stay in shape</option>
                </select>
                <div v-if="submitted && errors.has('scope')" class="invalid-feedback">{{ errors.first('scope') }}</div>
            </div>

            <div class="form-group">
                <button class="btn btn-primary" :disabled="status.registering">Register</button>
                <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/login" class="btn btn-link">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.register(this.user);
                }
            });
        }
    }
};
</script>