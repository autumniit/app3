import numpy as np

def get_sample_demands_from_model(p_theta):
    return list(map(lambda v:
                    np.random.gamma(v['alpha'], 1/v['beta']), p_theta))


def get_optimal_price_point_idx(p_theta, demands):

    # TODO: Parse p_theta -> prices
    prices = [p['price_point'] for p in p_theta]
    idxs = [p['id'] for p in p_theta]

    print("demands:", ["%.2f" % demand for demand in demands])
    price_index = idxs[np.argmax(np.multiply(prices, demands))]
    return price_index  # , prices[price_index]


def get_updated_params(new_demand, old_alpha, old_beta):
    new_alpha = old_alpha + new_demand
    new_beta = old_beta + 1
    return new_alpha, new_beta
