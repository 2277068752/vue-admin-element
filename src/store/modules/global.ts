/**
 * @Author : ChangJun
 * @Date : 2019-10-19
 * @Version : 1.0
 * @Content : 项目公共持久化资源
 */
import utils from '@/utils/modules/common';
import Loading from '@/model/global/Loading';
import { Commit } from 'vuex';

// 实例化 vuex 的 Commit
interface CommitProps {
	commit: Commit;
}

const MutationType = {
	setLoading: 'SET_LOADING'
};
const state = {
	loading: new Loading()
};
const getters = {
	loading: (state: any) => {
		return state.loading;
	}
};
const mutations = {
	[MutationType.setLoading] (state: any, val: Loading) {
		state.loading = val || utils.deepCopy(Loading);
	}
};
const actions = {
	setLoading (props: CommitProps, val: Loading) {
		props.commit(MutationType.setLoading, val);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
