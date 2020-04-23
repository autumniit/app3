import numpy as np

def get_sample_demands_from_model(p_theta):
    return list(map(lambda v:
                    np.random.gamma(v['alpha'], 1/v['beta']), p_theta))


def get_optimal_price_point_idx(p_theta, demands):

    prices = [p['price_point'] for p in p_theta]
    idxs = [p['id'] for p in p_theta]

    price_index = idxs[np.argmax(np.multiply(prices, demands))]
    return price_index  # , prices[price_index]


def get_updated_params(observed_demand, old_alpha, old_beta):
    new_alpha = old_alpha + observed_demand
    new_beta = old_beta + 1
    return new_alpha, new_beta
