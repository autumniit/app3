import numpy as np
from scipy.stats import gamma
from decimal import Decimal


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


def get_thompson_graph_parameters(price_point):
    shape = float(price_point['alpha'])
    scale = float(Decimal(1.0)/price_point['beta'])

    # CI 95
    a = gamma.ppf(0.025, shape, 0, scale)
    b = gamma.ppf(0.975, shape, 0, scale)

    mean = float(price_point['alpha']/price_point['beta'])
    pp = float(price_point['price_point'])

    return {'price_point': pp , 'mean': mean, 'a': a, 'b': b}
