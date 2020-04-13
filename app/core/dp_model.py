import numpy as np


class DynamicPricingModel:
    # parameters
    prices = [1.99, 2.49, 2.99, 3.49, 3.99, 4.49]
    alpha_0 = 30.00     # parameter of the prior distribution
    beta_0 = 1.00       # parameter of the prior distribution
    p_theta = []
    price_index_offered = 0

    def __init__(self):
        for p in self.prices:
            self.p_theta.append(
                {'price': p, 'alpha': self.alpha_0, 'beta': self.beta_0})

    def sample_demands_from_model(self, p_theta):
        return list(map(lambda v:
                        np.random.gamma(v['alpha'], 1/v['beta']), self.p_theta))

    def optimal_price(self):
        demands = self.sample_demands_from_model(self.p_theta)

        print("demands:", ["%.2f" % demand for demand in demands])

        price_index = np.argmax(np.multiply(self.prices, demands))
        self.price_index_offered = price_index
        return price_index, self.prices[price_index]

    def update(self, demand_t):
        demand_t = int(demand_t)
        v = self.p_theta[self.price_index_offered]
        v['alpha'] = v['alpha'] + demand_t
        v['beta'] = v['beta'] + 1

# Converting to generalized model
# pricepoints are retrieved along with their alpha and beta
# print out suggested price (or update the item's current price with the optimal price in this case)
# latest price offered's demand is then recorded
# the price's alpha and beta are updated accordingly

# the class should be just a utility class with methods to use -> does it connect to the database?

# functions:

# get_optimal_price(list of dict{price, demand, alpha, beta}) return pricepoint_id
# update_params(pricepoint_id, demand)

# **** NOT SURE HOW PYTHON PARSING WORKS ****


def get_sample_demands_from_model(p_theta):
    return list(map(lambda v:
                    np.random.gamma(v['alpha'], 1/v['beta']), self.p_theta))


def get_optimal_price_point_idx(p_theta, demands):

    # TODO: Parse p_theta -> prices
    # prices =

    print("demands:", ["%.2f" % demand for demand in demands])
    price_index = np.argmax(np.multiply(prices, demands))
    return price_index  # , prices[price_index]


def get_updated_params(new_demand, old_alpha, old_beta):
    new_alpha = old_alpha + new_demand
    new_beta = old_beta + 1
    return new_alpha, new_beta
